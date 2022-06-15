import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource, TableItem } from './table-datasource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatTable) table?: MatTable<TableItem>;
  dataSource?: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    // avoid the change of the data after view check ...
    setTimeout(() => {
      if (this.paginator != null && this.sort != null && this.table != null) {
        this.dataSource = new TableDataSource(this.paginator, this.sort);
        this.table.dataSource = this.dataSource;
      } else {
        throw 'Failed to init - missing depedencies.';
      }
    }, 0);
  }
}
