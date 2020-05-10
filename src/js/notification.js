import '../style/notification.css';

export default class Notification {
  init() {
    this.notification = document.createElement('p');
    this.notification.classList.add('notification');
    document.body.append(this.notification);
  }

  changeText(text, isError) {
    if (isError) {
      this.notification.classList.add('notification-error');
    } else {
      this.notification.classList.remove('notification-error');
    }

    this.notification.innerHTML = text;
  }
}
