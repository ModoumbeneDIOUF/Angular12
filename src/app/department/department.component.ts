import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(private http:HttpClient) { }

  departments:any=[];

  modalTitle ="";
  DepartementId = 0;
  DepartementName = "";

  DepartementIdFilter="";
  DepartementNameFilter="";
  departmentsWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>(environment.API_URL+'department')
    .subscribe(data=>{
      this.departments=data;
      this.departmentsWithoutFilter=data;
    });
  }

  addClick(){
    this.modalTitle="Add Department";
    this.DepartementId=0;
    this.DepartementName="";
  }

  editClick(dep:any){
    this.modalTitle="Edit Department";
    this.DepartementId=dep.DepartementId;
    this.DepartementName=dep.DepartementName;
  }

  createClick(){
    var val={
      DepartementName:this.DepartementName
    };

    this.http.post(environment.API_URL+'department',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }

  updateClick(){
    var val={
      DepartementId:this.DepartementId,
      DepartementName:this.DepartementName
    };

    this.http.put(environment.API_URL+'department',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }

  deleteClick(id:any){
    if(confirm('Are you sure?')){
    this.http.delete(environment.API_URL+'department/'+id)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
    }
  }
  FilterFn(){
    var DepartementIdFilter=this.DepartementIdFilter;
    var DepartementNameFilter=this.DepartementNameFilter;


    this.departments=this.departmentsWithoutFilter.filter(
      function(el:any){
        return el.DepartementId.toString().toLowerCase().includes(
          DepartementIdFilter.toString().trim().toLowerCase()
        )&& 
          el.DepartementName.toString().toLowerCase().includes(
          DepartementNameFilter.toString().trim().toLowerCase())
      }
    );
  }

  sortResult(prop:any,asc:any){
    this.departments=this.departmentsWithoutFilter.sort(function(a:any,b:any){
      if(asc){
        return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
      }
      else{
        return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
      }
    });
  }
}
