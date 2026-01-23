import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { RowGroupingModule } from 'ag-grid-enterprise'; 
import { PivotModule } from 'ag-grid-enterprise'; 
import { TreeDataModule } from 'ag-grid-enterprise'; 
import { MasterDetailModule } from 'ag-grid-enterprise'; 

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule , RowGroupingModule,PivotModule,TreeDataModule,MasterDetailModule]);
