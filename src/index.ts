
class CssStatsComponent {
  public constructor(private elem: HTMLElement) {
  }

  init() {
    console.log(this.elem);
  }
  
}

new CssStatsComponent(document.getElementById('css-stats')).init();