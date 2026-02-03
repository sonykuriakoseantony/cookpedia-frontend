import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Recipes } from './recipes/recipes';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Login } from './login/login';
import { Register } from './register/register';
import { Profile } from './profile/profile';
import { Pnf } from './pnf/pnf';
import { ViewRecipe } from './view-recipe/view-recipe';
import { SavedRecipe } from './saved-recipe/saved-recipe';

export const routes: Routes = [
    //pages to lazy load
    //Admin base url - http://localhost:4200/admin

    {
        path : 'admin', loadChildren : ()=> import ('./admin/admin-module').then(module=>module.AdminModule)
    },

    //home route
    {
        path : '',
        component : Home,
        title : 'Home | Cookpedia'
    },
    //recipes route
    {
        path : 'recipes',
        component : Recipes,
        title : 'All Recipes | Cookpedia'
    },
    //About route
    {
        path : 'about',
        component : About,
        title : 'About | Cookpedia'
    },
    //Contact route
    {
        path : 'contact',
        component : Contact,
        title : 'Contact | Cookpedia'
    },
    //Login route
    {
        path : 'login',
        component : Login,
        title : 'Login | Cookpedia'
    },
    //Register route
    {
        path : 'register',
        component : Register,
        title : 'Register | Cookpedia'
    },
    //Profile route
    {
        path : 'profile',
        component : Profile,
        title : 'Profile | Cookpedia'
    },
    //Saved Recipes route
    {
        path : 'recipes/saved',
        component : SavedRecipe,
        title : 'Saved Recipes | Cookpedia'
    },
    //View Recipe route
    {
        path : 'recipes/:id/view',
        component : ViewRecipe,
        title : 'View Recipe | Cookpedia'
    },
    //PageNotFound route
    {
        path : '**',
        component : Pnf,
        title : 'Page Not Found | Cookpedia'
    }
];
