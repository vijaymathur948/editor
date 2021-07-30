import "./App.css"
import axios from "axios"
import * as React from "react"
import {
  DocumentEditorContainerComponent,
  Toolbar,
} from "@syncfusion/ej2-react-documenteditor"
import "./App.css"

DocumentEditorContainerComponent.Inject(Toolbar)
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: "",
      specified_character_count: 0,
    }
  }
  setData(data) {
    this.setState({ data: data })
  }
  componentDidMount() {
    this.hidePropertiesPane()
  }
  loadDcoument = () => {
    console.log("data", this.state.data)
    this.container.documentEditor.open(this.state.data)
    this.onContentChange()
  }
  onContentChange() {
    const data = JSON.parse(this.container.documentEditor.serialize())
    const sections = data.sections[0].blocks
    var characters = 0
    console.clear()
    sections.map(obj_1 => {
      obj_1.inlines.map(obj_2 => {
        var text = obj_2.text
        //        text = text.replaceAll(" ", "")
        characters += text.length
        console.log("text", obj_2.text, text.length)
      })
    })
    var line = 0
    if (
      characters >= this.state.specified_character_count &&
      this.state.specified_character_count > 0
    ) {
      line = characters / this.state.specified_character_count
      characters = characters % this.state.specified_character_count
    }

    console.log(`Total ${parseInt(line)} lines, ${characters} characters.`)
    console.log("data", data)
  }
  hidePropertiesPane() {
    this.container.showPropertiesPane = false
  }
  updateSpecifiedCharacterCount(e) {
    this.setState({ specified_character_count: e.target.value })
  }
  render() {
    return (
      <>
        <input
          type='file'
          onChange={e => {
            var file
            if (e.target.files[0]) {
              file = e.target.files[0]
              console.log("files", file)

              var f = new FormData()
              f.append("file", file)

              axios
                .post(
                  "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/Import",
                  f
                )
                .then(res => {
                  console.log("response", res)
                  this.setData(res.data)
                  setTimeout(() => this.loadDcoument(), 1000)
                })
                .catch(err => console.log("error", err))
            }
          }}
        />
        <form
          action='#'
          onSubmit={e => {
            e.preventDefault()
          }}
        >
          <label htmlFor='specified_character_count'>
            Specified Character Count
          </label>
          &nbsp;
          <input
            type='number'
            id='specified_character_count'
            name='specified_character_count'
            onChange={this.updateSpecifiedCharacterCount.bind(this)}
          />
          <div style={{ width: "auto", height: "auto" }} name='textarea'>
            <DocumentEditorContainerComponent
              contentChange={e => this.onContentChange(e)}
              ref={scope => {
                this.container = scope
              }}
              id='container'
              height='50vh'
              enableToolbar={true}
              trackChange={e => {
                console.log("track changes", e)
              }}
              onChange={e => console.log("onchange account ", e)}
              documentChange={e => console.log("documentChange account ", e)}
              serviceUrl='https://ej2services.syncfusion.com/production/web-services/api/documenteditor/'
            />
          </div>
          <br />
          <br />
          <input type='submit' name='Submit' />
        </form>
      </>
    )
  }
}
