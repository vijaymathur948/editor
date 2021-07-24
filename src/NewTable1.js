/* eslint-disable no-console */
/* eslint-disable key-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable padded-blocks */
/* eslint-disable no-lone-blocks */
// import React from 'react';
// import ReactVirtualized from 'react-virtualized';
// const Grid = ReactVirtualized.Grid;

// export default class NewTable extends React.Component {
//   width = 20;
//   height = 100;
//   rows = this.generateData();

//   generateData() {
//     const rows = [];

//     for (let i = 0; i < this.height; i++) {
//       rows[i] = [];

//       for (let j = 0; j < this.width; j++) {
//         rows[i].push(`Route: ${i}`);
//       }
//     }

//     return rows;
//   }

//   cellRenderer = ({columnIndex, key, rowIndex}) => {
//     return (
//       <div key={key}>
//         <div className={'table-cell'}>{this.rows[rowIndex][columnIndex]}</div>
//       </div>
//     );
//   };

//   render() {
//     return (
//       <Grid
//         cellRenderer={this.cellRenderer}
//         columnCount={this.width}
//         columnWidth={100}
//         height={500}
//         rowCount={this.height}
//         rowHeight={30}
//         width={500}
//       />
//     );
//   }
// }

import React from "react"
import ReactDOM from "react-dom"
//import createComponent from "cxs-components";
import { Column, Table, AutoSizer, SortDirection } from "react-virtualized"

//import Draggable from "react-draggable";
import "react-virtualized/styles.css"
//import "./index.css";
//import { Search } from "react-bootstrap-table2-toolkit";
//import "./App.css";

const API_URL = "https://8ftv1tnvjj.execute-api.us-east-1.amazonaws.com/prod"
const date = "2022-01-01"
const driverId = "32376"

// const Header = createComponent("div")({
//   display: "flex",
//   justifyContent: "space-between",
// });

// const DragHandle = createComponent("span")({
//   cursor: "col-resize",
//   width: 1,
//   backgroundColor: "black",
// });
class NewTable extends React.Component {
  constructor(props) {
    super(props)
    this.headerRenderer = this.headerRenderer.bind(this)

    //this._sortList = this._sortList.bind(this);
    //const sortBy = "id";
    //const sortDirection = SortDirection.ASC;

    this.state = {
      //sortBy,
      //sortDirection,
      columnData: "",
      users: [],
      model: [" "],
      tableData: [],
      filterTableData: [],
      widths: {},
      windowWidth: window.innerWidth,
      deltaPosition: {
        x: 0,
        y: 0,
      },
    }
  }
  columns = {
    timestamp: "timestamp",
    routeid: "routeid",
    vehicleid: "vehicleid",
    lat: "lat",
    lng: "lng",
    passengerid: "passengerid",
    passengerfirstname: "passengerfirstname",
    passengerlastname: "passengerlastname",
    stopaddress: "stopaddress",
    stoptype: "stoptype",
    actiontype: "actiontype",
    vehiclespeed: "vehiclespeed",
  }

  //async function get request
  async componentDidMount() {
    //this.setState({ isLoading: true });

    const response3 = await fetch(
      "http://54.172.193.235:3000/event?startdate=2021-06-14T00:00:00.000Z&enddate=2021-06-14T23:59:53.766Z&vehicleid=393&routeid=1769&driverid=2344&pageno=1&pagelimit=10"
    )

    // const response1 = await fetch(`${API_URL}/load-data?date=${date}`);

    //const response2 = await fetch(`${API_URL}/get-mongo-model?date=${date}`);

    // const response4 = await fetch(
    //   `${API_URL}/get-events?date=${date}&event_driverid=${driverId}`
    // );

    // if (response4.ok) {
    //   const model2 = await response4.json();
    //   console.log('model2',model2);
    // }

    if (response3.ok) {
      const model1 = await response3.json()
      console.log("Model Data", model1.data)

      if (model1.data) {
        console.log("sortedArray", Object.keys(this.columns))
        this.setState({ model: model1.data })

        {
          Object.keys(this.state.model[0]).map(key =>
            this.setState(prevState => ({
              widths: {
                ...prevState.widths,
                [key]: 500,
              },
            }))
          )
        }
        this.setState({
          tableData: this.state.model,
          // isLoading: false,
          filterTableData: this.state.model,
          users: model1,
        })
      } else {
        // this.setState({ isLoading: true });
        console.log("Loading")
      }
    }
  }

  // handleChange = (event) => {
  //   this.setState({ searchInput: event.target.value }, () => {
  //     this.globalSearch();
  //   });
  // };

  // globalSearch = () => {
  //   let { searchInput } = this.state;
  //   let filteredData = this.state.tableData.filter((value) => {
  //     let filteredValue = Object.values(value).find(
  //       (item) => item === searchInput
  //     );
  //     if (filteredValue || searchInput === "") {
  //       return true;
  //     }
  //     // else {
  //     //   return false;
  //     // }
  //   });

  //   this.setState({ filterTableData: filteredData });
  // };

  headerRenderer({ label, dataKey }) {
    return (
      // <Header>
      <div>
        <span>{label}</span>

        {/* <Draggable
          axis="x"
          defaultClassName="DragHandle"
          defaultClassNameDragging="DragHandleActive"
          onStop={(event, data) => {
            this.setState((prevState) => ({
              widths: {
                [dataKey]: this.state.widths[dataKey] + data.x,
              },
            }));
          }}
          position={{
            x: 0,
            y: 0,
          }}
          zIndex={999}
        >
          <span className="DragHandleIcon">⋮</span>
        </Draggable> */}
      </div>
      // </Header>
    )
  }
  render() {
    return (
      <Table
        width={this.state.windowWidth}
        height={200}
        headerHeight={50}
        rowHeight={23}
        //sort={this._sort}
        //sortBy={this.state.sortBy}
        //sortDirection={this.state.sortDirection}
        rowCount={this.state.filterTableData.length}
        rowGetter={({ index }) => this.state.filterTableData[index]}
      >
        {Object.keys(this.columns).map(key => {
          const columnsLabel = {
            timestamp: "Time",
            lat: "Latitude",
            lng: "Longitude",
            passengerid: "Passenger Id",
            passengerfirstname: "Passenger First Name",
            passengerlastname: "Passenger Last Name",

            stopaddress: "Stop Address",
            stoptype: "Stop Type",
            actiontype: "Event Type",
            vehiclespeed: "Vehicle Speed",

            vehicleid: "Vehicle Id",
            routeid: "Route Id",
          }
          return (
            <Column
              width={1000}
              dataKey={key}
              label={key in columnsLabel ? columnsLabel[key] : key}
              headerRenderer={this.headerRenderer}
              cellRenderer={props => {
                const { dataKey, rowData } = props

                console.log("cell", dataKey, rowData)
                const columns = this.columns

                if (dataKey === "timestamp") {
                  return new Date(rowData[dataKey]).toLocaleTimeString()
                } else if (dataKey === columns.lat) {
                  if (dataKey in rowData) {
                    return rowData[dataKey]
                  } else {
                    return "N/A"
                  }
                } else if (dataKey === columns.lng) {
                  if (dataKey in rowData) {
                    return rowData[dataKey]
                  } else {
                    return "N/A"
                  }
                } else if (dataKey === columns.routeid) {
                  if (dataKey in rowData) {
                    return rowData[dataKey]
                  } else {
                    return "N/A"
                  }
                } else if (dataKey === columns.vehicleid) {
                  if (dataKey in rowData) {
                    return rowData[dataKey]
                  } else {
                    return "N/A"
                  }
                } else if (dataKey === columns.actiontype) {
                  if ("event" in rowData) {
                    return rowData.event[dataKey]
                  } else {
                    return "N/A"
                  }
                } else {
                  return "N/A"
                }
              }}
            />
          )
        })}
      </Table>

      // <AutoSizer>
      //     {({ height, width }) => (
      //       <Table
      //         width={this.state.windowWidth}
      //         height={200}
      //         headerHeight={40}
      //         rowHeight={40}
      //         rowCount={this.state.filterTableData.length}
      //         rowGetter={({ index }) => this.state.filterTableData[index]}
      //       >
      //         {Object.keys(this.state.model[0]).map((key) => (
      //           <Column
      //             width={this.state.widths[key]}
      //             dataKey={key}
      //             label={key}
      //             headerRenderer={this.headerRenderer}
      //           />
      //         ))}
      //       </Table>
      //     )}
      //   </AutoSizer>

      //  <div>Table</div>
    )
  }
}

export default NewTable
