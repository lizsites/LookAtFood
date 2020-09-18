import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';
import { Recipe } from './recipe';
import { Picture } from './picture';
import { Preference } from './preference';

export class User {
    public username : string;
    public password : string;
    public id : number;
    public preference : Preference;
    public pictures : Picture[];
    public recipes : Recipe[];

}
