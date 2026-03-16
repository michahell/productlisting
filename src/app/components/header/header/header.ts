import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import {
  HlmSheet,
  HlmSheetContent,
  HlmSheetDescription,
  HlmSheetHeader,
  HlmSheetPortal,
  HlmSheetTitle,
  HlmSheetTrigger,
} from '@spartan-ng/helm/sheet';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    HlmButton,
    HlmSheet,
    HlmSheetContent,
    HlmSheetDescription,
    HlmSheetHeader,
    HlmSheetPortal,
    HlmSheetTitle,
    HlmSheetTrigger,
    NgIcon,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
