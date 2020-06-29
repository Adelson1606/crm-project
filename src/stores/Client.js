import { observable, action } from 'mobx'

export class Client {
  @observable name
  @observable surname
  @observable country
  @observable firstContact
  @observable emailType
  @observable sold
  @observable owner

  constructor(id, name, surname, country, firstContact, emailType, sold, owner) {
    this.id = id
    this.name = name
    this.surname = surname
    this.country = country
    this.firstContact = firstContact
    this.emailType = emailType
    this.sold = sold
    this.owner = owner
  }
  @action updateClient = (newName, newSurname, newCountry) => {
    this.name = newName
    this.surname = newSurname
    this.country = newCountry
  }
  
}

