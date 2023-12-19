import { ToastSeverity } from 'primevue/api';

export class toastService {
    constructor(toastInstanse, defaultLifeTime) {
        this.toastInstanse = toastInstanse;
        this.defaultLifeTime = defaultLifeTime ? defaultLifeTime : '3000';
    }
    Info(body = '', title = 'Information', lifeTime = this.defaultLifeTime) {
        this.toastInstanse.add({ severity: ToastSeverity.INFO, summary: title, detail: body, life: lifeTime, contentStyleClass: 'text-lg' });
    }
    Success(body = '', title = 'Successfully', lifeTime = this.defaultLifeTime) {
        this.toastInstanse.add({
            severity: ToastSeverity.SUCCESS,
            summary: title,
            detail: body,
            life: lifeTime,
            contentStyleClass: 'bg-primary-200 text-lg'
        });
    }
    Warning(body = '', title = 'Warning', lifeTime = this.defaultLifeTime) {
        this.toastInstanse.add({ severity: ToastSeverity.WARN, summary: title, detail: body, life: lifeTime, contentStyleClass: 'text-lg' });
    }
    Error(body = '', title = 'Error', lifeTime = this.defaultLifeTime) {
        this.toastInstanse.add({ severity: ToastSeverity.ERROR, summary: title, detail: body, life: lifeTime, contentStyleClass: 'text-lg' });
    }
}
