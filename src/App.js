import "./App.css"
import axios from "axios"
import * as React from "react"
import {
  DocumentEditorContainerComponent,
  Toolbar,
} from "@syncfusion/ej2-react-documenteditor"
import "./App.css"
import ramraj from "./assets/ramraj.doc"

DocumentEditorContainerComponent.Inject(Toolbar)
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: "",
    }
  }
  setData(data) {
    this.setState({ data: data })
  }

  loadDcoument = () => {
    console.log("data", this.state.data)
    this.container.documentEditor.open(this.state.data)
  }
  render() {
    return (
      <>
        <input
          type='file'
          onChange={e => {
            var file
            if (e.target.files[0]) file = e.target.files[0]
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
          }}
        />

        <DocumentEditorContainerComponent
          contentChange={e => {
            const data = JSON.parse(this.container.documentEditor.serialize())
            const sections = data.sections[0].blocks
            var total = 0
            console.clear()
            sections.map(obj_1 => {
              obj_1.inlines.map(obj_2 => {
                var text = obj_2.text
                text = text.replaceAll(" ", "")
                total += text.length
                console.log("text", obj_2.text)
              })
            })
            console.log(
              "text",
              data,
              "lines",
              sections.length,
              "calculated lines  : ",
              Number(total / 60),
              "characters: ",
              total,
              ""
            )
          }}
          ref={scope => {
            this.container = scope
          }}
          id='container'
          height='96vh'
          enableToolbar={true}
          serviceUrl='https://ej2services.syncfusion.com/production/web-services/api/documenteditor/'
        />
      </>
    )
  }
}
