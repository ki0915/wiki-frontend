import { Component } from '@angular/core';
import { document } from './document.model';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'main-com',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

    filteredDocuments: document[] = [];

    private _filterText = '';
    get filterText(): string {
      return this._filterText;
    }

    set filterText(v: string){
      this._filterText = v;
      this.filteredDocuments = this.performFilter(v);
    }

    constructor(private router:Router) { this.ReadProcess()}

    documents: document[] = [];

    public viewProcess(title: string) {
      this.router.navigate(['/document'], { queryParams: { title: title } });
    }

    public performFilter(filterBy: string): document[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.documents.filter((document: document)=>{
          return document.title.toLocaleLowerCase().includes(filterBy);
      });
  }


    writeProcess (): void {
        this.router.navigate(['/write'])
    }

    chatProcess (title: string) {
        this.router.navigate(['/chat'], { queryParams: { title: title } });
    }

    async ReadProcess (): Promise<void> {
       const data = await axios.get("http://localhost:8080/article");
       this.documents = data.data;
    }

}
