import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Alive5Weather implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Alive5Weather',
		name: 'alive5Weather',
		icon: 'icons/weather-sunny.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get weather data from Open-Meteo API',
		defaults: {
			name: 'Alive5Weather',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [],
		requestDefaults: {
			baseURL: 'https://api.open-meteo.com',
			headers: {
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Forecast',
						value: 'forecast',
					},
				],
				default: 'forecast',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'forecast',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get current weather data',
						action: 'Get current weather data',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Latitude',
				name: 'latitude',
				type: 'string',
				displayOptions: {
					show: {
						resource: [
							'forecast',
						],
						operation: [
							'get',
						],
					},
				},
				default: '52.52',
				required: true,
				description: 'Geographical coordinate for the location (latitude)',
			},
			{
				displayName: 'Longitude',
				name: 'longitude',
				type: 'string',
				displayOptions: {
					show: {
						resource: [
							'forecast',
						],
						operation: [
							'get',
						],
					},
				},
				default: '13.41',
				required: true,
				description: 'Geographical coordinate for the location (longitude)',
			},
			{
				displayName: 'Weather Parameters',
				name: 'currentParameters',
				type: 'multiOptions',
				displayOptions: {
					show: {
						resource: [
							'forecast',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						name: 'Temperature (2m)',
						value: 'temperature_2m',
					},
					{
						name: 'Wind Speed (10m)',
						value: 'wind_speed_10m',
					},
					{
						name: 'Relative Humidity (2m)',
						value: 'relative_humidity_2m',
					},
				],
				default: ['temperature_2m'],
				description: 'Current weather parameters to include',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// For each item (usually just one)
		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				if (resource === 'forecast' && operation === 'get') {
					const latitude = this.getNodeParameter('latitude', i) as string;
					const longitude = this.getNodeParameter('longitude', i) as string;
					const currentParameters = this.getNodeParameter('currentParameters', i, ['temperature_2m']) as string[];
					
					// Make the API request with explicit full URL
					const responseData = await this.helpers.httpRequest({
						method: 'GET',
						url: 'https://api.open-meteo.com/v1/forecast',
						qs: {
							latitude,
							longitude,
							current: currentParameters.join(','),
						},
						headers: {
							Accept: 'application/json',
						},
					});

					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray(responseData),
						{ itemData: { item: i } },
					);
					
					returnData.push(...executionData);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}