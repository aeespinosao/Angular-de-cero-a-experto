import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from 'src/app/interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe: Heroe = {
    nombre: '',
    casa: 'Marvel',
    bio: '',
  }

  nuevo = false;
  id;

  constructor(private _heroesService: HeroesService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe( param => {
      this.id = param['id'];
      if (this.id !== 'nuevo') {
        this._heroesService.getHeroe(this.id).subscribe(res => {
          this.heroe = res;
        });
      }
    });
  }

  ngOnInit() {
  }

  guardar() {
    if (this.id === 'nuevo') {
      this._heroesService.nuevoHeroe(this.heroe).subscribe( res => {
        this.router.navigate(['/heroe', res['name']]);
      });
    } else {
      this._heroesService.actualizarHeroe(this.heroe, this.id).subscribe( res => {
        //this.router.navigate(['/heroe', res['name']]);
        console.log(res);
      });
    }
    
  }

  agregarNuevo(forma:NgForm) {
    this.router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      casa: 'Marvel'
    });
  }

}
