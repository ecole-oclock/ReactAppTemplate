import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/fr';

dayjs.extend(weekday);
dayjs.extend(localeData);

dayjs.locale('fr');

export default dayjs;
