import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {UserAuthoritiesService} from '../../../services/user-authorities.service';
import {Router} from '@angular/router';
import {AdminService} from '../../../services/admin/admin.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('*', style({height: '*', visibility: 'visible'})),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BoardAdminComponent implements OnInit {
  content = '';
  isAllowed = true;
  dataSource;
  displayedColumns = ['id', 'username', 'fname', 'lname', 'email'];
  // displayedColumns = ['position', 'name', 'weight'];
  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');
  expandedElement: any;


  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;


  constructor(
    private userService: UserAuthoritiesService,
    private adminService: AdminService,
    private changeDetectorRefs: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit() {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
        // if (data === 'Forbidden') {
        //   this.isAllowed = false;
        // }
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.router.navigate(['home']).then(this.router.navigate['home']);
      }
    );
    this.loadUserList();
  }

  loadUserList() {
    this.adminService.getUserList().subscribe(list => {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.changeDetectorRefs.detectChanges();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  disableAccount(id: any) {
    this.adminService.disableAccount(id).subscribe(response => {
      this.snackBar.open(response.message, 'OK', {
        duration: 4000,
      });
      this.loadUserList();
    }, error => {
      console.log(error);
      this.snackBar.open(error.error, 'OK', {
        duration: 4000,
      });
    });
  }

  enableAccount(id: any) {
    this.adminService.enableAccount(id).subscribe(response => {
      this.snackBar.open(response.message, 'OK', {
        duration: 4000,
      });
      this.loadUserList();
    }, error => {
      console.log(error);
      this.snackBar.open(error.error, 'OK', {
        duration: 4000,
      });
    });
  }
}


