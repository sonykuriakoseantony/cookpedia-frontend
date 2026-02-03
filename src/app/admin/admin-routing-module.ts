import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Downloads } from './downloads/downloads';
import { Recipes } from './recipes/recipes';
import { Users } from './users/users';
import { Feedbacks } from './feedbacks/feedbacks';
import { ManageRecipe } from './manage-recipe/manage-recipe';

const routes: Routes = [
  //Admin base url - http://localhost:4200/admin

  {
    path: '',
    component: Dashboard,
    title: 'Dashboard | Admin Cookpedia',
  },
  {
    path: 'recipes',
    component: Recipes,
    title: 'Recipes Coolection | Admin Cookpedia',
  },
  {
    path: 'users',
    component: Users,
    title: 'Users | Admin Cookpedia',
  },
  {
    path: 'downloads',
    component: Downloads,
    title: 'Recipe Downloads | Admin Cookpedia',
  },
  {
    path: 'feedbacks',
    component: Feedbacks,
    title: 'Feedbacks | Admin Cookpedia',
  },
  {
    path: 'recipes/add',
    component: ManageRecipe,
    title: 'Add Recipe | Admin Cookpedia',
  },
  {
    path: 'recipes/edit/:id',
    component: ManageRecipe,
    title: 'Edit Recipe | Admin Cookpedia',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
