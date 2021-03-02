import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly HttpPostClient: HttpPostClient
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const HttpResponse = await this.HttpPostClient.post({
      url: this.url,
      body: params,
    })

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.unathorided:
        throw new InvalidCredentialsError()
    }
  }
}
