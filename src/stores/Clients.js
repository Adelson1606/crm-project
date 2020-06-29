import { observable, action } from 'mobx'
import { Client } from './Client';
import moment from 'moment';
const axios = require('axios')

export class Clients {

  @observable clients = []

  @observable modal = {
    show: false,
    body: null
  }

  @action showModal(body) {
    this.modal.show = true;
    this.modal.body = body;
  }

  @action closeModal() {
    this.modal.show = false;
    this.modal.body = null;
  }

  @action getClients = async () => {
    const newArr = []
    const response = await axios.get('http://localhost:8080/clients')
    response.data.forEach(cl => {
      cl.emailType
        ? newArr.push(new Client(cl._id, cl.name.split(' ')[0], cl.name.split(' ')[1], cl.country, moment(cl.firstContact).format('L'), cl.emailType, cl.sold, cl.owner))
        : newArr.push(new Client(cl._id, cl.name.split(' ')[0], cl.name.split(' ')[1], cl.country, moment(cl.firstContact).format('L'), '-', cl.sold, cl.owner))
    })

    this.clients = newArr
  }

  @action addClient = async (name, surname, country, owner) => {
    const newClient = {
      name: name + ' ' + surname,
      country: country,
      email: null,
      firstContact: new Date(),
      emailType: null,
      sold: false,
      owner: owner
    }

    const data = await axios.post('http://localhost:8080/actions', newClient)
    const cl = data.data
    const newArr = [...this.clients]
    cl.emailType
    ? newArr.push(new Client(cl._id, cl.name.split(' ')[0], cl.name.split(' ')[1], cl.country, moment(cl.firstContact).format('L'), cl.emailType, cl.sold, cl.owner))
    : newArr.push(new Client(cl._id, cl.name.split(' ')[0], cl.name.split(' ')[1], cl.country, moment(cl.firstContact).format('L'), '-', cl.sold, cl.owner))
    this.clients = newArr
  }
}