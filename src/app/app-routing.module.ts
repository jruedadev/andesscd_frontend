import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostCreateEditFormComponent } from './posts/post-create-edit-form/post-create-edit-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: HomeComponent,
    title: "Inicio"
  },
  { path: 'posts', component: PostsComponent, title: "Blog" },
  { path: 'post/:id/detail', component: PostCreateEditFormComponent, title: "Artículo" },
  { path: 'post/:id/edit', component: PostCreateEditFormComponent, title: "Artículo" },
  { path: '**', component: NotFoundComponent, title: "404" },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
