import {
  AppBar,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from '@material-ui/core'
import React from 'react'
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

export const SPTable = (props) => {
  const {
    table,
    isFetching = false,
    columnFiltering = false,
    title = '',
    showTitle = true,
    noRecordsText = 'No Records Found'
  } = props

  const {
    columns,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    pageOptions,
    state,
    gotoPage,
    setPageSize,
    prepareRow,
    tableActions = [],
  } = table

  const { pageIndex, pageSize } = state

  return (
    <>
      <AppBar position={'static'}>
        <Toolbar>
          <Typography variant={'h6'} style={{ flexGrow: 1 }}>
            {showTitle ? title : null}
          </Typography>
          {isFetching ? <CircularProgress color={'secondary'} /> : null}
          {tableActions.map((action, index) => (
            <div key={index}>{action}</div>
          ))}
        </Toolbar>
      </AppBar>
      {pageSize < rows.length ? (
        <TablePagination
          component='div'
          rowsPerPage={pageSize}
          count={rows.length}
          page={pageIndex}
          onChangePage={(event, newPage) => {
            gotoPage(newPage)
          }}
          labelDisplayedRows={(from, to, count) => {
            return `Page ${pageIndex + 1} of ${pageOptions.length}`
          }}
          onChangeRowsPerPage={(event) => {
            setPageSize(parseInt(event.target.value, 10))
            gotoPage(0)
          }}
        />
      ) : null}
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, index) => {
            return (
              <TableRow
                key={`${title}_tableHeadRow_${index}`}
                {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}>
                      <div>
                        {column.render('Header')}
                        <span>
                          {column.canSort ?
                            <TableSortLabel hideSortIcon={true}>
                              {column.isSorted ?
                                column.isSortedDesc
                                  ? <ArrowDownwardIcon fontSize={'small'} htmlColor={'#aaa'} />
                                  : <ArrowUpwardIcon fontSize={'small'} htmlColor={'#aaa'} />
                                : <ImportExportIcon fontSize={'small'} htmlColor={'#aaa'} />}
                            </TableSortLabel>
                            : null}
                        </span>
                      </div>
                      {columnFiltering ? (
                        <div>
                          {column.canFilter ? column.render('Filter') : null}
                        </div>
                      ) : null}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.length ? (
            page.map((row, index) => {
              prepareRow(row)
              return (
                <TableRow
                  key={`${title}_tableBodyRow_${index}`}
                  {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell
                        {...cell.getCellProps()}
                        style={{
                          maxWidth: '250px',
                          wordWrap: 'break-word',
                        }}>
                        {cell.render('Cell')}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })
          ) : (
            <TableRow key={`${title}_tableBodyRow_NoRecords`}>
              <TableCell colSpan={columns.length}>{noRecordsText}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pageSize < rows.length ? (
        <TablePagination
          component='div'
          rowsPerPage={pageSize}
          count={rows.length}
          page={pageIndex}
          onChangePage={(event, newPage) => {
            gotoPage(newPage)
          }}
          labelDisplayedRows={(from, to, count) => {
            return `Page ${pageIndex + 1} of ${pageOptions.length}`
          }}
          onChangeRowsPerPage={(event) => {
            setPageSize(parseInt(event.target.value, 10))
            gotoPage(0)
          }}
        />
      ) : null}
    </>
  )
}
