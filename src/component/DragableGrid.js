import React from "react";
import PropTypes from "prop-types";
import ReactDataGrid from "react-data-grid";
import {DraggableHeader} from "react-data-grid-addons";

const {Row} = ReactDataGrid
const {DraggableContainer} = DraggableHeader;

export default class DragableGrid extends React.Component {
    constructor(props, context) {
        super(props, context)
        let _originalRows = props.rows
        let _columns = props.columns
        let _rows = _originalRows.slice(0)

        this.state = {
            originalRows: _originalRows,
            rows: _rows,
            columns: _columns,
            customComparator: props.customComparator,
            rowsCount: props.rowsCount?props.rowsCount:0,
            rowRendererComp: RowRenderer
        }
    }

    componentDidMount() {
        /*window.addEventListener('resize', (e) => {
         })*/
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rows) {
            let _originalRows = nextProps.rows
            let _rows = _originalRows.slice(0)
            this.setState({
                rows: _rows,
                originalRows: _originalRows,
                rowsCount: _originalRows ? _originalRows.length : 0
            })
        }
        if (nextProps.columns) {
            this.setState({
                columns: nextProps.columns
            })
        }
        if (nextProps.rowRendererComp) {
            this.setState({
                rowRendererComp: nextProps.rowRendererComp
            })
        }
    }

    rowGetter = (i) => {
        return this.state.rows[i]
    }
    onHeaderDrop = (source, target) => {
        const stateCopy = Object.assign({}, this.state)
        const columnSourceIndex = this.state.columns.findIndex(
            i => i.key === source
        )
        const columnTargetIndex = this.state.columns.findIndex(
            i => i.key === target
        )

        stateCopy.columns.splice(
            columnTargetIndex,
            0,
            stateCopy.columns.splice(columnSourceIndex, 1)[0]
        )

        const emptyColumns = Object.assign({}, this.state, {columns: []})
        this.setState(
            emptyColumns
        )

        const reorderedColumns = Object.assign({}, this.state, {columns: stateCopy.columns})
        this.setState(
            reorderedColumns
        )
    }

    handleGridSort = (sortColumn, sortDirection) => {
        console.log('sortColumn:' + sortColumn + ',sortDirection' + sortDirection)
        const defaultComparator = (a, b) => {
            if (sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1
            } else if (sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1
            }
        }
        // Just an expample here
        const customComparator1 = (a, b) => {
            if (sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1
            } else if (sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1
            }
        }
        let comparator = defaultComparator
        if (this.state.customComparator && this.state.customComparator[sortColumn]) {
            if (this.state.customComparator[sortColumn] === 'customComparator1') {
                comparator = customComparator1
            }
        }
        // Custom comparator example end
        const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparator)
        this.setState({rows})

        if (this.props.handleSortColumn) {
            this.props.handleSortColumn(sortColumn, sortDirection)
        }
    }

    render() {
        let {minHeight, minWidth} = this.props;
        let count = 14; //this.state.rowsCount <12 ? 12:this.state.rowsCount;
        let minHeightForRows = count * 30 + 38;
        return (
            <DraggableContainer onHeaderDrop={this.onHeaderDrop}>
                <ReactDataGrid
                    onGridSort={this.handleGridSort}
                    columns={this.state.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.state.rowsCount}
                    minWidth={minWidth ? minWidth : 900}
                    minHeight={minHeight ? minHeight : minHeightForRows}
                    rowRenderer={this.state.rowRendererComp ? this.state.rowRendererComp : RowRenderer}
                    emptyRowsView={EmptyRowsView}
                />
            </DraggableContainer>
        )
    }

    static propTypes = {
        rows: PropTypes.array.isRequired,
        columns: PropTypes.array.isRequired,
        customComparator: PropTypes.array,
        rowsCount: PropTypes.number.isRequired,
        handleSortColumn: PropTypes.func,
        rowRendererComp: PropTypes.any
    }
}

class RowRenderer extends React.Component {
    static propTypes = {
        idx: PropTypes.number.isRequired
    };

    setScrollLeft = (scrollBy) => {
        // if you want freeze columns to work, you need to make sure you implement this as apass through
        this.row.setScrollLeft(scrollBy)
    };

    getRowBackground = () => {
        return this.props.idx % 2 ? '' : 'girdRowOven'
    };

    render() {
        // here we are just changing the style
        // but we could replace this with anything we liked, cards, images, etc
        // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
        return (<div className={this.getRowBackground()} >
            <Row ref={node => this.row = node} {...this.props} colVisibleEnd={this.props.colDisplayEnd} />
        </div>
    )}
}

class EmptyRowsView extends React.Component {
    render() {
        return (<div style={{textAlign: 'center', paddingTop: '10px'}}>No Records Found</div>);
    }
}
