export interface TemperatureAndHumidity {
  datetime: Date;
  humidity: number;
  temperature: number;
}

export interface TemperatureAndHumidityEmitter {
  end(): Promise<void>
  on(eventName: 'error', listener: (err: Error) => void | Promise<void>): this;
  on(eventName: 'result', listener: (data: TemperatureAndHumidity) => void | Promise<void>): this;
  read(): Promise<void>;
}

export function event(busNumber: number): TemperatureAndHumidityEmitter;

export function read(busNumber: number): Promise<TemperatureAndHumidity>;
