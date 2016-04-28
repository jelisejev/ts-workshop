
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
    const {rules, selectors} = data.stats;
    
    this.elem.find('.results').removeClass('hidden');
    this.elem.find('.rules').text(rules.total);
    this.elem.find('.selectors').text(selectors.total);
  }  
}

interface CssStatsData {
  stats: {
    rules: {
      total: number;
    };
    selectors: {
      total: number;
    }
  }
}

new CssStatsComponent($('#css-stats')).init();