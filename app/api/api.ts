import axios from 'axios';
import urljoin from 'url-join';
import {
  Transaction,
  TransactionResults,
  MempoolTransaction,
  AddressBalanceResponse,
  CoreNodePoxResponse,
  CoreNodeInfoResponse,
  NetworkBlockTimesResponse,
} from '@blockstack/stacks-blockchain-api-types';
import { Configuration, BurnchainApi } from '@stacks/blockchain-api-client';

export class Api {
  stacksApiConfig = new Configuration({
    basePath: this.baseUrl,
  });
  burnchainApi = new BurnchainApi(this.stacksApiConfig);

  constructor(public baseUrl: string) {}

  async getAddressBalance(address: string) {
    return axios.get<AddressBalanceResponse>(
      urljoin(this.baseUrl, `/extended/v1/address/${address}/balances`)
    );
  }

  async getAddressTransactions(address: string) {
    return axios.get<TransactionResults>(
      urljoin(this.baseUrl, `/extended/v1/address/${address}/transactions`)
    );
  }

  async getTxDetails(txid: string) {
    return axios.get<Transaction | MempoolTransaction>(
      urljoin(this.baseUrl, `/extended/v1/tx/${txid}`)
    );
  }

  async getFaucetStx(address: string, stacking?: boolean) {
    return axios.post(
      urljoin(
        this.baseUrl,
        `/extended/v1/faucets/stx?address=${address}${stacking ? '&stacking=true' : ''}`
      )
    );
  }

  async getFeeRate() {
    return axios.get<string>(urljoin(this.baseUrl, `/v2/fees/transfer`));
  }

  async getPoxInfo() {
    return axios.get<CoreNodePoxResponse>(urljoin(this.baseUrl, `/v2/pox`));
  }

  async getNodeStatus() {
    return axios.post(urljoin(this.baseUrl, `/extended/v1/status`));
  }

  async getCoreDetails() {
    return axios.get<CoreNodeInfoResponse>(urljoin(this.baseUrl, `/v2/info`));
  }

  async getNetworkBlockTimes() {
    return axios.get<NetworkBlockTimesResponse>(
      urljoin(this.baseUrl, `/extended/v1/info/network_block_times`)
    );
  }

  getStacksRewards(address: string) {
    return this.burnchainApi.getBurnchainRewardListByAddress({ address });
  }

  async callReadOnly({
    contract,
    functionName,
    args,
  }: {
    contract: string;
    functionName: string;
    args: string[];
  }) {
    const [contractAddress, contractName] = contract.split('.');
    const url = urljoin(
      this.baseUrl,
      `/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`
    );
    const body = {
      sender: 'ST384HBMC97973427QMM58NY2R9TTTN4M599XM5TD',
      arguments: args,
    };
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.result as string;
  }
}
