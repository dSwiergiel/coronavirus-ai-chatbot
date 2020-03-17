import { Pipe, PipeTransform, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "linkify"
})
export class LinkifyPipe implements PipeTransform {
  constructor(private _domSanitizer: DomSanitizer) {}

  transform(value: any, args?: any): any {
    //return this._domSanitizer.bypassSecurityTrustHtml(this.stylize(value));

    return this._domSanitizer.sanitize(
      SecurityContext.HTML,
      this._domSanitizer.bypassSecurityTrustHtml(this.urlify(value))
    );

    // return this._domSanitizer.sanitize(
    //   SecurityContext.HTML,
    //   this._domSanitizer.bypassSecurityTrustHtml(this.stylize(value))
    // );
  }

  private stylize(text: string): string {
    let stylizedText: string = "";
    if (text && text.length > 0) {
      for (let t of text.split(" ")) {
        if (t.startsWith("@") && t.length > 1)
          stylizedText += `<a href="#${t.substring(1)}">${t}</a> `;
        else stylizedText += t + " ";
      }
      return stylizedText;
    } else return text;
  }

  private urlify(text: string): string {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
      return '<a target="_blank" href="' + url + '">' + url + "</a>";
    });
  }
}
