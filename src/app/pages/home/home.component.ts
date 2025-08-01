import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BuscaUsuariosComponent } from "../buscarUsuarios/busca-usuarios/busca-usuarios.component";
import { ListaAmigosComponent } from "../listaAmigos/lista-amigos/lista-amigos.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, BuscaUsuariosComponent, ListaAmigosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  imagenSeleccionada: string | null = null;
  currentUserId: number | null = null;
  // Variables para controlar los acordeones
  isPostFormExpanded: boolean = false;
  isImageSectionExpanded: boolean = false;

  mockImagenes: string[] = [
    'https://i.imgur.com/QPuEyFb.png',
    'https://i.imgur.com/h8cPUvm.jpeg',
    'https://i.imgur.com/fqHuj4D.jpeg',
    'https://i.imgur.com/23eobe5.jpeg'
  ];

  posts: any[] = [];
  newPost = {
    contenido: '',
    imagenUrl: '',
    autorId: 0,
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    this.newPost.autorId = this.currentUserId ?? 0;
    this.obtenerPosts();
  }


  // Métodos para controlar acordeones
  togglePostForm(): void {
    this.isPostFormExpanded = !this.isPostFormExpanded;
    // Si se cierra el formulario principal, también cerrar la sección de imágenes
    if (!this.isPostFormExpanded) {
      this.isImageSectionExpanded = false;
    }
  }

  toggleImageSection(): void {
    this.isImageSectionExpanded = !this.isImageSectionExpanded;
  }

  // Método mejorado para seleccionar imagen
  selectImage(imageUrl: string): void {
    if (this.newPost.imagenUrl === imageUrl) {
      // Si ya está seleccionada, deseleccionar
      this.newPost.imagenUrl = '';
    } else {
      // Seleccionar nueva imagen
      this.newPost.imagenUrl = imageUrl;
    }
  }

  obtenerPosts() {
    this.http.get<any>(`http://localhost:8080/red-social/api/posts/feed/${this.currentUserId}`).subscribe(
      data => {
        this.posts = data.content.map((post: any) => ({
          ...post,
          mostrarComentarios: false,
          nuevoComentario: ''
        }));
      },
      error => console.error('Error al obtener posts', error)
    );

  }

  publicarPost() {
    if (!this.newPost.contenido.trim()) {
      alert('¡No puedes publicar un post vacío!');
      return;
    }

    this.http.post('http://localhost:8080/red-social/api/posts', this.newPost).subscribe(
      () => {
        // Limpiar el formulario
        this.newPost.contenido = '';
        this.newPost.imagenUrl = '';

        // Cerrar acordeones después de publicar
        this.isPostFormExpanded = false;
        this.isImageSectionExpanded = false;

        // Recargar posts
        this.obtenerPosts();

        // Mostrar mensaje de éxito (opcional)
        console.log('¡Post publicado exitosamente!');
      },
      error => console.error('Error al publicar', error)
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newPost.imagenUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  darLike(post: any): void {
    this.http.post(`http://localhost:8080/red-social/api/likes/post/${post.id}/usuario/${this.currentUserId}`, null).subscribe(() => {
      console.log('like al post', post.id);
      this.obtenerPosts();
    });

  }

  abrirComentarios(post: any): void {
    post.mostrarComentarios = !post.mostrarComentarios;
    this.http.get<any>(`http://localhost:8080/red-social/api/comentarios/post/${post.id}`).subscribe(
      data => {
          post.comentarios = data;
          post.comentarios.forEach((comentario: any) => {
            comentario.autor = comentario.autor.nombre || 'Desconocido'; // Manejo de autor desconocido
            comentario.texto = comentario.contenido; 
          });
      },
      error => console.error('Error al obtener posts', error)
    );
    console.log('Abrir comentarios para el post', post.id);
  }
  abrirModal(url: string, dialog: HTMLDialogElement) {
    this.imagenSeleccionada = url;
    dialog.showModal();
  }

  agregarComentario(post: any) {
    if (!post.nuevoComentario?.trim()) return;

    const comentarioDTO = {
      contenido: post.nuevoComentario.trim(),
      postId: post.id,
      autorId: this.currentUserId
    };

    this.http.post(
      'http://localhost:8080/red-social/api/comentarios',
      comentarioDTO,
      { headers: { 'Content-Type': 'application/json' } }
    ).subscribe(() => {
      console.log('Comentario agregado correctamente');
      this.obtenerPosts();
    });

    // Agregar comentario en el frontend temporalmente (optimismo)
    const nuevo = {
      autor: 'Tú',
      texto: post.nuevoComentario.trim()
    };

    post.comentarios = post.comentarios || [];
    post.comentarios.push(nuevo);
    post.nuevoComentario = '';
    post.cantidadComentarios = post.comentarios.length;
  }

}