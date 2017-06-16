import { SoftwarePkg } from './software-package';

export class TemplateNodeObj {
    "prefLabel": string;
    "altLabel":string;
    "cpus": string;
    "memory": string;
    "osURI": string;
    "requires": SoftwarePkg[];
}
