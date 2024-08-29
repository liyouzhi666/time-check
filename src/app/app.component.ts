import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = '选择';
  index = 0;
  dateValue = new Date();
  latestDepartureTime = new Date();

  configList = [
    {
      label: '剩余飞行时间',
      select: false,
      hour: 0,
      min: 0,
      mins: [0],
    },
    {
      label: '起飞机场滑行时间',
      select: true,
      hour: 0,
      min: 0,
      mins: [15],
    },
    {
      label: '飞行计划空中时间',
      select: false,
      hour: 0,
      min: 0,
      mins: [0],
    },
    {
      label: '目的地机场地面滑行时间',
      select: true,
      hour: 0,
      min: 0,
      mins: [15],
    },
  ];
  remainingDuration = 0;

  calculationDuration() {
    const total = this.configList[0].hour * 60 + this.configList[0].min;
    const used = this.configList
      .slice(1)
      .reduce(
        (acc, curr) =>
          acc + curr.hour * 60 + (curr.select ? curr.mins[0] : curr.min),
        0
      );
    this.remainingDuration = total - used;
    const castTime =
      this.configList[1].mins[0] +
      (total -
        (this.configList[2].hour * 60 +
          this.configList[2].min +
          this.configList[3].mins[0]));
    this.latestDepartureTime.setTime(
      this.dateValue.getTime() + 1000 * 60 * castTime
    );
  }

  handleDuration(duration: any) {
    const data = Math.abs(duration);
    return `${
      Math.floor(data / 60) > 0 ? `${Math.floor(data / 60)}小时` : ''
    } ${data % 60}分钟`;
  }

  currentDateFormat(date: Date, format: string = 'HH:MM'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    return format
      .replace('HH', pad(date.getHours()))
      .replace('MM', pad(date.getMinutes()));
  }

  onOk(result: Date) {
    this.name = this.currentDateFormat(result);
    this.dateValue = result;
  }

  onChange(item: any) {
    console.log('onChange', item);
  }

  onTabClick(item: any) {
    console.log('onTabClick', item);
  }
}
