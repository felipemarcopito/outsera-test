import { 
   Test, 
   TestingModule 
} from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { selectFileToImport } from '../utils/select-file-to-import';
import { config } from '../config';

describe('AwardController', () => {

   let app: INestApplication;

   beforeAll(async () => {
      const moduleFixture: TestingModule = await Test
         .createTestingModule({
            imports: [AppModule]
         }).compile();
      await selectFileToImport(true);
      app = moduleFixture.createNestApplication();
      await app.init();
   });

   afterAll(async () => {
      await app.close();
   });

   it('should return a valid data structure', async () => {
      const response = await request(app.getHttpServer())
         .get(`/award/${config.goldenRaspberryAwards}/category/${config.worstPicture}/winners`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
         min: expect.arrayContaining([
            expect.objectContaining({
               producer: expect.any(String),
               interval: expect.any(Number),
               previousWin: expect.any(Number),
               followingWin: expect.any(Number),
            }),
         ]),
         max: expect.arrayContaining([
            expect.objectContaining({
               producer: expect.any(String),
               interval: expect.any(Number),
               previousWin: expect.any(Number),
               followingWin: expect.any(Number),
            })
         ])
      });
      expect(response.body.min).toHaveLength(2);
      expect(response.body.max).toHaveLength(2);
   });
});
