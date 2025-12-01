import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private readonly ENCRYPTION_KEY = ''

  encrypt(data: string):string {
    return btoa(data)
  }
  decrypt(encryptedData: string): string {
    try {
      return atob(encryptedData)
    } catch (error) {
      return ''
    }
  }
}
