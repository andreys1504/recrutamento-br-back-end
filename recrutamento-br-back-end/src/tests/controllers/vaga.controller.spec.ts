import { Test } from '@nestjs/testing';
import { TokenPayload } from '../../api/configurations/security-routes/token.payload';
import { RolesApi } from '../../core/authorizations/roles-api';
import { ResponseAppService } from '../../core/domain/application-services/response/response-app-service';
import { CadastroVagaDataResponse } from '../../domain/painel-vagas/application-services/vaga/cadastro-vaga/cadastro-vaga.data-response';
import { VagaController } from '../../api/controllers/vaga.controller';
import { CadastroVagaAppService } from '../../domain/painel-vagas/application-services/vaga/cadastro-vaga/cadastro-vaga.app-service';
import { EdicaoVagaAppService } from '../../domain/painel-vagas/application-services/vaga/edicao-vaga/edicao-vaga.app-service';
import { AppModule } from '../../app.module';

describe('VagaController', () => {
  let vagaController: VagaController;
  const cadastroVagaAppServiceFake = {
    handleAsync: jest.fn(),
  };
  const edicaoVagaAppServiceFake = {
    handleAsync: jest.fn(),
  };

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [VagaController],
      providers: [
        {
          provide: CadastroVagaAppService,
          useFactory: () => ({
              ...cadastroVagaAppServiceFake
          }),
        },
        {
            provide: EdicaoVagaAppService,
            useFactory: () => ({
                ...edicaoVagaAppServiceFake
            }),
          },
      ],
    }).compile();

    vagaController = testingModule.get(VagaController);
  });

  describe('CadastrarVaga', () => {
    it('retornar notificação quando o titulo não for informado', async () => {
      //arrange
      const responseAppService = {
        success: false,
        data: null,
        notifications: [
            {
                key: 'titulo',
                message: 'informe o Título'
            }
        ]
      } as ResponseAppService<CadastroVagaDataResponse>;
      cadastroVagaAppServiceFake.handleAsync.mockResolvedValue(responseAppService);

      const body = {
        tituloVaga: '',
        descricao: 'experiência de mais de 20 anos',
        tags: ['asp'],
      };

      const req = {
        user: {
            idUsuario: 'a9d5495-asd5-asdas',
            idCandidatoRecrutador: '009jaol-asdas-fgdsfsd',
            email: 'andreys1504@gmail.com',
            permissoes: [RolesApi.Recrutador]
        } as TokenPayload
      };


      //act
      const response = await vagaController.cadastrarVaga(body, req);

      //console.log(response);

      //assert
      expect(response).toEqual(responseAppService);
      expect(response.success).toEqual(false);
    });
  });
});
