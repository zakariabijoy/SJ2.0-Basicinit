import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from '../../services/layout/layout.service';
import { slideInAnimation } from '../../data/animation/animation'
@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class CustomizerComponent implements OnInit {
  public customizer: string = '';

  constructor(private modalService: NgbModal, public layout:LayoutService) {
    
   }

   openModal(popup: any) {
    this.modalService.open(popup, { backdropClass: 'dark-modal', centered: true });
  }

  ngOnInit(): void {
  }

  Customizer(val: any) {
    this.customizer = val;
  }

  copyText(data: any) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(data);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    // this.toastrService.show('<p class="mb-0 mt-1">Code Copied to clipboard</p>', '', { closeButton: true, enableHtml: true, positionClass: 'toast-bottom-right' });
  }
}
