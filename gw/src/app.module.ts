import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // ... Apollo server options
        cors: true,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [{ name: 'users', url: 'http://localhost:3001/graphql' }],
        }),
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
