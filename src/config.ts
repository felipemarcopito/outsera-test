import { ClassTransformOptions } from "class-transformer";

export const config = {
   importFile: '',
   goldenRaspberryAwards: 'Golden Raspberry Awards',
   worstPicture: 'Worst Picture',
   instanceToPlain: {
      defaultOptions: { 
         strategy: 'excludeAll' 
      } as ClassTransformOptions
   }
};