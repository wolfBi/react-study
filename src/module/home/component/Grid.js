import React, {Component} from "react";
import {Col, DropdownButton, MenuItem } from "react-bootstrap";
import {CommonUtil, HttpUtil, LogUtil} from "../../../utils";
import Detail from "./Detail";
import DragableGrid from "../../../component/DragableGrid";
import "./Grid.css";

export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.tableDivRef = null;

        this.state = {
            baseApiList:["http://localhost:8080/quartz-manager/rest"],
            selectedBaseApi:'http://localhost:8080/quartz-manager/rest',
            expandDataTable: false,
            page: 1,
            startIndex: 0,
            sortColumn: '',
            sortDirection: '',
            totalCount: 0,
            data: [],
            filterData: [],
            openEditModal: false,
            editUniqueid: '',
            editRow: {},
            columns: []
        };
        this.openColumns = [
            {
                name: 'Job Name',
                key: 'jobName',
                cellClass: 'tableHeader center ',
                width:250,
                formatter: this.editFormatter,
                getRowMetaData: (row) => row
            },
            {
                name: 'Job Group',
                key: 'jobGroup',
                width:250,
                cellClass: 'tableHeader center ',
            },
            {
                name: 'Status',
                key: 'jobStatus',
                cellClass: 'tableHeader center',
                width:100,
            },
            {
                name: 'Description',
                key: 'description',
                width:100,
                cellClass: 'tableHeader center ',
            }
        ];
        this.openExpendColumns = [
            {
                name: 'Cron Expression',
                key: 'cronExpression',
                width:150,
                cellClass: 'tableHeader center ',
            },
            {
                name: 'Create Time',
                key: 'createTime',
                width:80,
                cellClass: 'tableHeader center ',
            },
            {
                name: 'Next Fire Time',
                key: 'nextFireTime',
                width:80,
                cellClass: 'tableHeader center ',
            },
            {
                name: 'Last Fired Time',
                key: 'lastFiredTime',
                width:80,
                cellClass: 'tableHeader center ',
            }]
        this.openColumnsTotalWidth = 720;
        this.openExpendColumnsTotalWidth = 420;
    }

    componentDidMount() {
        this.resize();
        this.toggleOpenTab();
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => {
        let offsetWidth = document.body.offsetWidth;
        const {clientWidth} = this.tableDivRef;
        offsetWidth = offsetWidth * 0.9;
        let marginWidth = (clientWidth - offsetWidth) / 2;
        this.setState({
            clientWidth,
            marginWidth,
            windowWidth: offsetWidth
        })
    }
    toggleOpenTab = () => {
        let columns = this.getColumns(this.state.expandDataTable);
        this.setState({
            expandDataTable: false,
            searchText:'',
            data: [],
            filterData: [],
            page: 1,
            totalCount: 0,
            startIndex: 0,
            columns
        }, () => {
            this.fetchData();
        })
    }

    fetchData = () => {
        if (this.props.userProfile && !CommonUtil.isEmpty(this.props.userProfile.name)) {
            const url = this.state.selectedBaseApi + '/scheduler/list';
            LogUtil.info('fetch overview data from ' + url)
            HttpUtil.get(url, {}, this.props.dispatch)
                .then((jsonData) => {
                    if (jsonData && jsonData.status){
                        this.setState({
                            data: jsonData.rowData,
                            filterData: jsonData.rowData,
                            totalCount: jsonData.rowData.length
                        })
                    } else {
                        this.setState({
                            data: [],
                            filterData: [],
                            totalCount: 0
                        })
                    }
                }, () => {
                    LogUtil.error('Fetch grid data error, please check the network')
                })
        }
    }

    filterData = () => {
        let {data, searchText} = this.state;
        let filterData = data.filter((item) => {
            return JSON.stringify(item).indexOf(searchText) >= 0
        })
        this.setState({
            filterData
        })
    }


    onSortChange = (_sortColumnm, _sortDirection) => {
        this.setState({
            sortColumn: _sortColumnm,
            sortDirection: _sortDirection
        }, () => {
            this.fetchData();
        })
    }

    editFormatter = (props) => {
        return <button type="button" className="linkButton" style={{color: '#009be0'}} title={props.value}
                       onClick={() => {
                           this.handleShow(props.dependentValues)
                       }}>{props.value}</button>
    }
    handleShow = (row) => {
        this.setState({
            openEditModal: true,
            editRow: row
        })
    }
    closeModal = () => {
        this.setState({
            openEditModal: false,
            editUniqueid: '',
            editRow: {}
        })
    }
    expandFunc = () => {
        let columns = this.getColumns(!this.state.expandDataTable);
        this.setState({
            columns,
            expandDataTable: !this.state.expandDataTable
        })
    }
    getColumns = (expandDataTable)=>{
        let columns = this.openColumns;
        let gridTotalWidth = expandDataTable ? this.state.windowWidth : this.state.clientWidth;
        let colTotalWidth = this.openColumnsTotalWidth;

        if(expandDataTable){
            colTotalWidth += this.openExpendColumnsTotalWidth;
            columns = [
                ...columns,
                ...this.openExpendColumns
            ]
        }

        columns = CommonUtil.deepClone(columns);
        columns = columns.map((column)=>{
            let width = (column.width/colTotalWidth) * gridTotalWidth;
            if(width > column.width){
                column.width = width;
            }
            column.draggable = true
            column.resizable = true
            column.sortable = true
            return column
        })
        return columns;
    }
    cardholderClick = (selectedBaseApi) => {
        this.setState({
            selectedBaseApi,
        }, () => {
            this.fetchData();
        })
    }

    render() {
        return (
            <div>
                {this.state.openEditModal ?
                    <Detail dispatch={this.props.dispatch}
                                   uniqueId={this.state.editUniqueid}
                                   openModal={this.state.openEditModal } editRow={ this.state.editRow }
                                   fetchData={this.fetchData} toggleModal={ this.closeModal }/> : false}
                <div className="buyerCardTab">
                    <span >
                        Scheduler Job List
                    </span>
                </div>
                <div className="commonBackground clearfix" style={{padding: '3px', height: '40px'}}>
                    <Col xs={2} style={{paddingLeft: '8px'}}>
                        <DropdownButton id='dropdownCardholder' title={this.state.selectedBaseApi}
                                        bsStyle="default" className='dropdownCardholder'
                                        onSelect={this.cardholderClick}>
                            {this.state.baseApiList.map((cardholder, i) => {
                                return <MenuItem key={"cardholderList_" + i} eventKey={cardholder}>
                                    {cardholder}
                                </MenuItem>
                            })}
                        </DropdownButton>
                    </Col>
                    <Col xs={7}></Col>
                    <Col xs={3} style={{paddingLeft: '70px', height: '30px'}}>
                        <input type="text" name="searchText" className="searchInput commonRadius"
                               placeholder="Search" value={this.state.searchText}
                               onChange={(e) => {
                                   let value = e.target.value;
                                   this.setState({
                                       searchText: value
                                   }, () => {
                                       this.filterData()
                                   })
                               }}/>
                    </Col>
                </div>
                <div ref={ref => (this.tableDivRef = ref)}
                     className={"gridContainer " + (this.state.expandDataTable ? 'extra_fat' : '')}
                     style={this.state.expandDataTable ? {
                         marginLeft: this.state.marginWidth,
                         width: this.state.windowWidth,
                         background: '#FFF'
                     } : {}}>
                    <div className="expand_collapse_buttons">
                        <div className="primary_bkgd">
                            <div
                                className={"arrow_icon " + (!this.state.expandDataTable ? 'expand_icon' : 'collapse_icon')}
                                onClick={this.expandFunc}></div>
                        </div>
                    </div>
                    <DragableGrid rows={this.state.filterData} columns={this.state.columns}
                                  handleSortColumn={this.onSortChange} rowsCount={this.state.filterData.length}
                                  minWidth={this.state.expandDataTable ? this.state.windowWidth : this.state.clientWidth }/>
                </div>
            </div>
        )
    }
}
