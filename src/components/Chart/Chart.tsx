import { useEffect } from 'react';
import { useTypificatedDispatch, useTypificatedSelector } from '../../hooks/hooks';
import { selectFinances } from '../../redux/Finance/FinanceSelectors';
import { GetAllFinances } from '../../redux/Finance/FinanceOperation';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

interface FinanceChartProps {
    type: 'incomes' | 'expense',
    month: Month,
    year: number
}

// interface FinanceChartData {
//     name: string,
//     price: number
// }

export default function FinanceChart({ type, month, year }: FinanceChartProps) {
    const data = useTypificatedSelector(selectFinances)
    const dispatch = useTypificatedDispatch()
    const MONTH_INDEX = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12
    }

    const filteredData = data.filter((item) => {
        const d = new Date(item.date)

        return (
            d.getMonth() + 1 === MONTH_INDEX[month] &&
            d.getFullYear() === year
        )
    })

    const maxValue = Math.max(...filteredData.map(i => i.amount), 0)

    const chartData = {
        labels: filteredData.map(item => item.description),
        datasets: [
            {
                data: filteredData.map(item => item.amount),
                backgroundColor: '#ff751d',
                borderRadius: 10,
                categoryPercentage: 0.5,
                barPercentage: 0.8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            },

            datalabels: {
                anchor: 'end',
                align: 'top',
                color: '#111',
                font: {
                    weight: 'bold',
                    size: 14
                },
                formatter: (value: number) => `${value} грн`
            },

            tooltip: {
                enabled: true
            }
        },

        scales: {
            x: {
                grid: {
                    display: false
                }
            },

            y: {
                display: false,
                min: 0,
                suggestedMax: maxValue * 1.4
            }
        }
    } as const;

    useEffect(() => {
        dispatch(GetAllFinances(type))

    }, [type, month])




    return (
        <>
            <div style={{ marginTop: '100px', width: '758px' }}>
                <Bar data={chartData} options={options} />
            </div>
        </>
    )

}