import { Component, IComponentBindings, ComponentOptions, QueryEvents,IQuerySuccessEventArgs, IQuerySuggestResponse, IQuerySuggestCompletion, QueryStateModel } from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';

export interface IHaveYouTriedOptions {
  title: string;
}

@lazyComponent
export class HaveYouTried extends Component {
    static ID = 'HaveYouTried';
    static options: IHaveYouTriedOptions = {
      title: ComponentOptions.buildStringOption({ defaultValue: '<b>No results?</b> You can also try: ' }),
    };

    constructor(public element: HTMLElement, public options: IHaveYouTriedOptions, public bindings: IComponentBindings) {
        super(element, HaveYouTried.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, HaveYouTried, options);
        this.bind.onRootElement(
          QueryEvents.querySuccess,
          (args: IQuerySuccessEventArgs) => this.onQuerySuccess(args)
        );
    }

    private getSuggestion(result: IQuerySuggestCompletion): Node {
      console.log(result.expression);
  
      const suggestion = Coveo.$$(
        "a",
        { class: "CoveoHaveYouTried-element" },
        `${result.expression}`
      ).el;
  
      Coveo.$$(suggestion).on("click", () => {
        this.queryStateModel.set(
          QueryStateModel.attributesEnum.q,
          result.expression
        );
        this.queryController.executeQuery();
      });
  
      return suggestion;
    }
  
    protected renderTitle(){
      return Coveo.$$(
        "div",
        { class: "CoveoHaveYouTried-wrapper" },
        "<span class='CoveoHaveYouTried-title'>"+this.options.title+"</span>"
      ).el;
    }

    private getSuggestionlist(results: IQuerySuggestCompletion[]) {
      const allResults = results.map((result: IQuerySuggestCompletion) =>
        this.getSuggestion(result)
      );
  
      const listWrapper = this.renderTitle();
  
      const list = Coveo.$$("ul", { class: "CoveoHaveYouTried-suggestions" }).el;
  
      list.append(...allResults);
  
      listWrapper.append(list);
  
      this.element.append(listWrapper);
    }
  
    private populateSuggestions(results: IQuerySuggestResponse) {
      this.getSuggestionlist(results.completions);
    }
  
    private clearSuggestions() {
      this.element.innerHTML = "";
    }
  
    private onQuerySuccess(args: IQuerySuccessEventArgs) {
      const queryText = args.query.q;
      const results =
        args.results.results.length < 1 || args.results.results == undefined;
  
      if (results) {
        this.clearSuggestions();
        const querySuggest = this.queryController.getEndpoint().getQuerySuggest({
          q: queryText,
        });
  
        querySuggest.then((qResults: IQuerySuggestResponse) => {
          if (qResults.completions.length > 0) {
            this.populateSuggestions(qResults);
          }
        });
      } else {
        this.clearSuggestions();
      }
    }
}