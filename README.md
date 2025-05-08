# n8n-nodes-alive5-weather

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

This is an n8n community node that allows you to easily fetch weather data from the Open-Meteo API in your workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Features

- Fetch current weather data from Open-Meteo's free weather API
- Configure latitude and longitude for any location
- Select specific weather parameters to retrieve (temperature, wind speed, humidity)

## Installation

### In n8n Docker container

1. Stop your n8n container if it's running
2. Copy the entire node package to your n8n custom nodes directory:
```bash
docker cp /path/to/n8n-nodes-alive5-weather n8n:/home/node/.n8n/custom/n8n-nodes-alive5-weather
```
3. Restart your n8n container

### From npm registry

You can install the package directly from npm registry:

```bash
npm install n8n-nodes-alive5-weather
```

### Manual Installation

1. Clone this repository
2. Navigate to the directory: `cd n8n-nodes-alive5-weather`
3. Build the node: `npm run build`
4. Link the package to your n8n installation: 
   - Execute `npm link` in the package directory
   - In your n8n installation directory, run `npm link n8n-nodes-alive5-weather`

## Usage

After installation, you'll find the "Alive5Weather" node in the n8n nodes panel.

1. Add the Alive5Weather node to your workflow
2. Configure the node:
   - Select "Forecast" as the resource
   - Select "Get" as the operation
   - Enter the latitude and longitude for your desired location
   - Select which weather parameters you want to retrieve (temperature, wind speed, humidity)
3. Connect the node to your workflow

The node will return JSON data containing the current weather information for the specified location.

## Example Response

```json
{
  "latitude": 52.52,
  "longitude": 13.419,
  "generationtime_ms": 0.08893013000488281,
  "utc_offset_seconds": 0,
  "timezone": "GMT",
  "timezone_abbreviation": "GMT",
  "elevation": 38,
  "current_units": {
    "time": "iso8601",
    "temperature_2m": "°C"
  },
  "current": {
    "time": "2023-05-08T12:00",
    "temperature_2m": 22.3
  }
}
```

## Resources

- [Open-Meteo API Documentation](https://open-meteo.com/en/docs)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md)