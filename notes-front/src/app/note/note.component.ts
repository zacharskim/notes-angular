import { Component, Input, SimpleChanges } from '@angular/core';
import Quill from 'quill';
import { Note } from '../note.model';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  editor: Quill | null = null;
  @Input() note!: Note | null;

  constructor() { }

  


  ngOnChanges(changes: SimpleChanges) {
    if (changes['note'] && this.editor) {
      this.setEditorContent();
      console.log("idk even know");
    }
  }

  

  setEditorContent() {

    var Delta = Quill.import('delta');

    const delta = new Delta([
      { insert: 'Hello', attributes: { bold: true } },
      { insert: ' world!' },
      { insert: '\n' },
      { insert: 'Quill is cool!'},
      { insert: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seexerciture dolor in reprehenderit in voluptate velit esse cillum dolore eu'},
      { insert: '\n' },
      { insert: 'Bulleted item 1' },
      { insert: '\n', attributes: { list: 'bullet' } },
      { insert: 'Bulleted item 2' },
      { insert: '\n', attributes: { list: 'bullet' } },

    ]);


    if (this.note && this.editor) {
      this.editor.setContents(delta);
      console.log(this.note.content, "setting content?");
    }
  }



  ngAfterViewInit() {
    setTimeout(() => {
  
      this.editor = new Quill('#editor', {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['code-block'],
          ]
        },
        placeholder: '',
        theme: 'snow' 
      });
      this.editor.format('color', 'white');
    }, 0);
  }
  
}
