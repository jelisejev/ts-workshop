
class CssStatsComponent {
  protected api: string = 'http://localhost:8080';
  
  public constructor(private elem: JQuery) {
  }

  init() {
    this.elem.find('.analyze').click(() => this.loadStats($('input', this.elem).val()));
  }

  protected loadStats(url: string) {
    return $.get(this.api + '/stats', { url }).then((data) => this.renderResults(data));
  }
  
  private renderResults(data: CssStatsData) {
    const {rules, selectors, declarations} = data.stats;
    
    this.elem.find('.results').removeClass('hidden');
    this.elem.find('.rules').text(rules.total);
    this.elem.find('.selectors').text(selectors.total);
    
    this.renderColors(declarations);
  }  
  
  private renderColors(declarations: Declarations) {
    const colorContainer: JQuery = this.elem.find('.colors');
    this.getUniqueColors(declarations).forEach((color: string) => {
      $('<div class="col-md-3"></div>')
        .text(color)
        .css('background', color)
        .appendTo(colorContainer);
    });
  }
  
  private getUniqueColors(declarations: Declarations) {
    return declarations.properties.color.reduce((uniqueColors: Array<string>, color: string) => {
      if (uniqueColors.indexOf(color) === -1) {
        uniqueColors.push(color);
      }
      
      return uniqueColors;
    }, []);
  }
}

interface CssStatsData {
  stats: {
    rules: {
      total: number;
    };
    selectors: {
      total: number;
    },
    declarations: Declarations;
  }
}

interface Declarations {
  properties: {
    color: Array<string>  
  };
}

new CssStatsComponent($('#css-stats')).init();