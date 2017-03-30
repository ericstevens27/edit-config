import {Component, ElementRef, ViewChild} from '@angular/core';
import * as FileSaver from "file-saver";
import {
  restriction,
  descOpenRestrictions,
  descXML,
  descOpenTag,
  descCloseRestrictions,
  descCloseTag,
  descOpenFav,
  descCloseFav
} from './restriction.component';
import {descKey, descTitle, descType, descValue} from './restriction.component';
import {ENTRIES, range} from './restriction.component';

import { LoggerService }  from './logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    providers:  [LoggerService]
})
export class AppComponent {
  spyLog: string[];
  constructor(private logger: LoggerService, private elementRef: ElementRef) {
  }

  @ViewChild('xmlDiv') div;

  title = 'Edit Launcher Configuration';
  q = '&quot;';
  bO = '{';
  bC = '}';
  lt = '&lt;';
  gt = '&gt;';

  entries = ENTRIES;
  dKey = descKey;
  dORes = descOpenRestrictions;
  dCRes = descCloseRestrictions;
  dTitle = descTitle;
  dType = descType;
  dValue = descValue;
  dX = descXML;
  dOTag = descOpenTag;
  dCTag = descCloseTag;
  dOF = descOpenFav;
  dCF = descCloseFav;
  r = range;

  appToAdd = '';
  resArea = {
    "gridReservedCells": [[
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false]
    ]],
    "hotseatReservedCells": [false, false, false, false, false]
  };
  contentWallList = [  ];
  urlToAdd = '';
  initList = [];
  initEditList = [];
  initPackageName = '';
  initFav = true;
  initIsPinned = true;
  initScreen = '0';
  initX = '0';
  initY = '0';
  initRow = "";
  hsList = [];
  hsEditList = [];
  hsPackageName = '';
  hsFav = true;
  hsIsPinned = true;
  hsSlot = '0';
  hsRow = "";
  prefList = [];
  prefEditList = [];
  prefPackageName = '';
  prefIsPinned = false;
  prefScreen = '0';
  prefX = '0';
  prefY = '0';
  prefRow = "";
  elementList = [];
  stringEncoded = '';
  count = 0;
  tmp = '';
  showAll = false;
  textFull = this.dX + "\n" + this.dORes + "\n";
  widList = [];
  widEditList = [];
  widPackageName = '';
  widClassName = '';
  widIsPinned = false;
  widScreen = '0';
  widX = '0';
  widY = '0';
  widSpanX = '1';
  widSpanY = '1';
  widType = '4';
  widRow = "";

  assembleElement(i: number) {
    this.elementList = [];
    this.elementList.push(this.dKey + '"' + this.entries[i].key + '"');
    this.elementList.push(this.dType + '"' + this.entries[i].type + '"');
    this.elementList.push(this.dTitle + '"' + this.entries[i].title + '"');
    if (this.entries[i].valueType == 'boolean') {
      this.elementList.push(this.dValue + '"' + this.entries[i].value + '"');
    }
    if (this.entries[i].valueType == 'json-list') {
      this.elementList.push(this.dValue + '" [' + this.encode(this.entries[i].value) + '] "');
    }
    if (this.entries[i].valueType == 'json') {
      if (this.entries[i].key == 'reserved.areas') {
        this.elementList.push(this.dValue + '"' + this.replaceQuote(JSON.stringify(this.resArea, null, ' ')) + '"');
      }else{
        this.elementList.push(this.dValue + '"' + this.replaceQuote(JSON.stringify(this.entries[i].value, null, ' ')) + '"');
      }
    }
    if (this.entries[i].valueType == 'xml') {
      this.elementList.push(this.dValue + '"' + this.encodeXML(this.dX));
      this.elementList.push(this.encodeXML(this.dOF));
      for (let l of this.entries[i].value) {
        this.elementList.push(this.encodeXML(l));
      }
      this.elementList.push(this.encodeXML(this.dCF) + '"');
    }
    if (this.entries[i].valueType == 'string') {
      this.elementList.push(this.dValue + '"' + this.entries[i].value + '"');
    }
    this.textFull = this.textFull + this.dOTag + "\n";
    for (let item of this.elementList) {
      this.textFull = this.textFull + item + "\n";
    }
    this.textFull = this.textFull + this.dCTag + "\n";

    return this.elementList;
  }


  encode(arr: any): string {
    this.stringEncoded = '';
    this.count = 0;
    for (let item of arr) {
      this.count = this.count - -1;
      this.stringEncoded = this.stringEncoded + this.q + item + this.q;
      if (this.count < arr.length) {
        this.stringEncoded = this.stringEncoded + ',';
      }
    }
    return this.stringEncoded;
  }

  replaceQuote(s: string): string {
    return s && s.replace(/"/g, this.q);
  }

  encodeXML(s: string): string {
    this.tmp = s.replace(/"/g, this.q);
    this.tmp = this.tmp.replace(/</g, this.lt);
    this.tmp = this.tmp.replace(/>/g, this.gt);
    return this.tmp;
  }

  onAddInit(event: any) { // without type info
    if (this.initFav) {
      this.initRow = this.initRow + "<favorite"
    } else {
      this.initRow = this.initRow + "<appwidget"
    }
    this.initRow = this.initRow + ' isPinned="';
    if (this.initIsPinned) {
      this.initRow = this.initRow + '1"'
    } else {
      this.initRow = this.initRow + '0"'
    }
    this.initRow = this.initRow + ' packageName="' + this.initPackageName + '"';
    this.initRow = this.initRow + ' screen=' + this.initScreen + '"';
    this.initRow = this.initRow + ' x=' + this.initX + '"';
    this.initRow = this.initRow + ' y=' + this.initY + '"';
    this.initRow = this.initRow + ' />';
    this.entries[6].value.push(this.initRow);
    this.initEditList.push(this.initPackageName);
    this.initPackageName = '';
    if (this.entries[6].value.length != 0) {
      this.entries[6].show = true;
    }else{
      this.entries[6].show = false;
    }

  }

  onAddHS(event: any) { // without type info
    if (this.hsFav) {
      this.hsRow = this.hsRow + "<favorite"
    } else {
      this.hsRow = this.hsRow + "<appwidget"
    }
    this.hsRow = this.hsRow + ' container="-101"';
    this.hsRow = this.hsRow + ' isPinned="';
    if (this.hsIsPinned) {
      this.hsRow = this.hsRow + '1"'
    } else {
      this.hsRow = this.hsRow + '0"'
    }
    this.hsRow = this.hsRow + ' packageName="' + this.hsPackageName + '"';
    this.hsRow = this.hsRow + ' screen="' + this.hsSlot + '"';
    this.hsRow = this.hsRow + ' />';
    this.entries[6].value.push(this.hsRow);
    this.hsEditList.push(this.hsPackageName);
    this.hsPackageName = '';
    if (this.entries[6].value.length != 0) {
      this.entries[6].show = true;
    }else{
      this.entries[6].show = false;
    }

  }

  onAddPref(event: any) { // without type info
    this.prefRow = '{ ';
    this.prefRow = this.prefRow + '"packageName":"' + this.prefPackageName + '", ';
    this.prefRow = this.prefRow + '"container":-100, ';
    this.prefRow = this.prefRow + '"screen":' + this.prefScreen + ', ';
    this.prefRow = this.prefRow + '"x":' + this.prefX + ', ';
    this.prefRow = this.prefRow + '"y":' + this.prefY + ', ';
    this.prefRow = this.prefRow + '"isPinned":';
    if (this.prefIsPinned) {
      this.prefRow = this.prefRow + 'true }'
    } else {
      this.prefRow = this.prefRow + 'false }'
    }
    this.entries[7].value[this.prefPackageName] = JSON.parse(this.prefRow);
    this.prefEditList.push(this.prefPackageName);
    this.prefPackageName = '';
    if (this.prefEditList.length != 0) {
      this.entries[7].show = true;
    }else{
      this.entries[7].show = false;
    }

  }

  onAddwid(event: any) { // without type info
    this.widRow = '{ ';
    this.widRow = this.widRow + '"packageName":"' + this.widPackageName + '", ';
    this.widRow = this.widRow + '"className":"' + this.widClassName + '", ';
    this.widRow = this.widRow + '"container":-100, ';
    this.widRow = this.widRow + '"screen":' + this.widScreen + ', ';
    this.widRow = this.widRow + '"x":' + this.widX + ', ';
    this.widRow = this.widRow + '"y":' + this.widY + ', ';
    this.widRow = this.widRow + '"spanX":' + this.widSpanX + ', ';
    this.widRow = this.widRow + '"spanY":' + this.widSpanY + ', ';
    this.widRow = this.widRow + '"type":' + this.widType + ', ';

    this.widRow = this.widRow + '"isPinned":';
    if (this.widIsPinned) {
      this.widRow = this.widRow + 'true }'
    } else {
      this.widRow = this.widRow + 'false }'
    }
    console.log("Trying to process: ", this.widRow);
    this.entries[10].value[this.widPackageName] = JSON.parse(this.widRow);
    this.widEditList.push(this.widPackageName);
    this.widPackageName = '';
    if (this.widEditList.length != 0) {
      this.entries[10].show = true;
    }else{
      this.entries[10].show = false;
    }

  }

  onAddContent(event: any) { // without type info
    if (this.urlToAdd != '') {
      this.entries[5].value.push(JSON.parse('{ "info": "' + this.urlToAdd + '", "type": 1001 }'));
      this.contentWallList.push(this.urlToAdd);
    }
    this.urlToAdd = '';
    if (this.entries[5].value.length != 0) {
      this.entries[5].show = true;
    }else{
      this.entries[5].show = false;
    }
  }

  onAddApp(event: any) { // without type info
    if (this.appToAdd != '') {
      this.entries[2].value.push(this.appToAdd);
    }
    this.appToAdd = '';
    if (this.entries[2].value.length != 0) {
      this.entries[2].show = true;
    }else{
      this.entries[2].show = false;
    }
  }

  onRemoveApp(app: string): void {
    const index = this.entries[2].value.indexOf(app);
    this.entries[2].value.splice(index, 1);
    if (this.entries[2].value.length != 0) {
      this.entries[2].show = true;
    }else{
      this.entries[2].show = false;
    }
  }

  onRemoveURL(url: string): void {
    const index = this.entries[5].value.indexOf(url);
    this.entries[5].value.splice(index, 1);
    this.contentWallList.splice(index, 1);
    if (this.entries[5].value.length != 0) {
      this.entries[5].show = true;
    }else{
      this.entries[5].show = false;
    }
  }

  onRemoveInit(init: string): void {
    const index = this.initEditList.indexOf(init);
    this.initList.splice(index, 1);
    this.initEditList.splice(index, 1);
    if (this.initEditList.length != 0) {
      this.entries[6].show = true;
    }else{
      this.entries[6].show = false;
    }
  }

  onRemovePref(pref: string): void {
    const index = this.prefEditList.indexOf(pref);
    this.entries[7].value.splice(index, 1);
    this.prefEditList.splice(index, 1);
    if (this.prefEditList.length != 0) {
      this.entries[7].show = true;
    }else{
      this.entries[7].show = false;
    }
  }

  onRemovewid(wid: string): void {
    const index = this.widEditList.indexOf(wid);
    this.entries[10].value.splice(index, 1);
    this.widEditList.splice(index, 1);
    if (this.widEditList.length != 0) {
      this.entries[10].show = true;
    }else{
      this.entries[10].show = false;
    }
  }

  setShow(i: number) {
    this.entries[i].show = this.entries[i].value;
  }

  toggleShow(i: number) {
    if (this.entries[i].value != '') {
      this.entries[i].show = true;
    }else{
      this.entries[i].show = false;

    }
  }

  setAllShow() {
    if (this.showAll == true) {
      for (let i of this.r) {
        this.entries[i].show = true;
      }
    }
  }

  saveTextFile(event: any, id: string) {
    console.log(this.div.nativeElement.textContent)
      this.textFull = this.cleanText(this.div.nativeElement.textContent);
/*    for (let line of hostElem.children) {
      if (hostElem.textContent != '') {
        this.textFull = this.textFull + hostElem.textContent;
        console.log("this line is: " + hostElem.textContent);
      }
    }*/
    let file = new File([this.textFull], "hello.txt", {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(file, "hello.txt");
      console.log("full text file: " + this.textFull);

  }

  cleanText(s: string): string {
    this.tmp = s.replace(/"  "/g, '');
    this.tmp = this.tmp.replace(/\n\n/g, "\n");
    return this.tmp;
  }

}
