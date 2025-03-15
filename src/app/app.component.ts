import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper'; // Importação do Swiper
import { EffectCards, Navigation, Pagination } from 'swiper/modules'; // Módulos específicos para o efeito de cartas, navegação e paginação
import 'swiper/css'; // Estilo base do Swiper
import 'swiper/css/effect-cards'; // Estilo específico para o efeito de cartas
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Howl } from 'howler';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule
  ]
})
export class AppComponent implements OnInit {
  title = 'ILoveYou';
  sound: Howl;
  isPlaying: boolean = false;
  duration: number = 0;
  currentTime: number = 0;
  interval: any;
  
  constructor() {
    this.sound = new Howl({
      src: ['assets/My Love Mine All Mine.mp3'], // Arquivo na pasta assets
      html5: true,
      onload: () => {
        this.duration = this.sound.duration(); // Pega a duração da música
      }
    });
  } 

  currentImage: number = 0;
  timeElapsed: string = '';

  ngOnInit() {
    this.updateTimer();
    this.updateMusicTime();
    setInterval(() => this.updateTimer(), 1000);
  }

  ngAfterViewInit() {
    const swiper = new Swiper('.mySwiper', {
      effect: 'cards', // Ativa o efeito de cartas
      grabCursor: true, // Mostra o cursor de "agarrar" ao passar o mouse
      modules: [EffectCards], // Carrega o módulo de efeito de cartas
    });
  }
  playSound() {
    this.sound.play();
    this.isPlaying = true;
    this.updateMusicTime();
  }

  pauseSound() {
    this.sound.pause();
    this.isPlaying = false;
    clearInterval(this.interval);
  }

  stopSound() {
    this.sound.stop();
    this.isPlaying = false;
    this.currentTime = 0;
    clearInterval(this.interval);
  }

  updateMusicTime() {
    this.interval = setInterval(() => {
      if (this.sound.playing()) {
        this.currentTime = this.sound.seek() as number;
      }
    }, 1000);
  }

  seek(event: any) {
    const newTime = event.target.value;
    this.sound.seek(newTime);
    this.currentTime = newTime;
  }


  updateTimer() {
    const startDate = new Date('2024-02-05T00:00:00');
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();

    // Cálculo dos componentes de tempo
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7); // Calcula as semanas
    const years = Math.floor(days / 365); // Calcula os anos

    // Ajusta os dias e semanas para não contar os dias já contabilizados nos anos e semanas
    const remainingDays = days % 365; // Dias restantes após calcular os anos
    const remainingWeeks = Math.floor(remainingDays / 7); // Semanas restantes após calcular os anos
    const finalDays = remainingDays % 7; // Dias restantes após calcular as semanas

    // Formata o tempo decorrido, ocultando os anos se for zero
    let timeString = years > 0 ? `${years} ano, ` : "";
    timeString += `${remainingWeeks} semanas, ${finalDays}d ${hours}h ${minutes}m ${seconds}s`;

    this.timeElapsed = timeString;
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
}

