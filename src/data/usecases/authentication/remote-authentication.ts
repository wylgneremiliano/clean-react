import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AccountModel } from '@/domain/models/account-model'
import { AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly HttpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const HttpResponse = await this.HttpPostClient.post({
      url: this.url,
      body: params,
    })

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.ok:
        break
      case HttpStatusCode.unathorided:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
