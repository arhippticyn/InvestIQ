import { useMemo, useEffect, useState } from 'react';
import { useTypificatedSelector, useTypificatedDispatch } from '../../hooks/hooks';
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
import styles from '../../sass/components/Chart/Chart.module.scss';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

interface FinanceChartProps {
    type: 'incomes' | 'expense',
    month: number,
    year: number,
}

export default function FinanceChart({ type = 'expense', month, year }: FinanceChartProps) {
    const allFinances = useTypificatedSelector(selectFinances);
    const dispatch = useTypificatedDispatch();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(GetAllFinances(type));
    }, [dispatch, type, month, year]);

    const chartDataData = useMemo(() => {
        const filtered = allFinances.filter((item) => {
            const d = new Date(item.date);
            return d.getMonth() === month && d.getFullYear() === year;
        });
        return filtered.sort((a, b) => b.amount - a.amount);
    }, [allFinances, month, year]);

    if (chartDataData.length === 0) {
        return (
            <section className={styles.chart}>
                <div className={styles.container} >
                    <p className={styles.text}>
                        Немає даних за цей період
                    </p>
                </div>
            </section>
        );
    }

    const data = {
        labels: chartDataData.map(item => item.description || "Інше"),
        datasets: [
            {
                data: chartDataData.map(item => item.amount),
                backgroundColor: '#FF751D',
                borderRadius: isMobile ? 5 : 10,
                barThickness: isMobile ? 15 : 38,
                maxBarThickness: 40,
            },
        ],
    };

    const options = {
        indexAxis: isMobile ? ('y' as const) : ('x' as const),
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: isMobile
                ? { left: 50, right: 40 }
                : { top: 30, left: 10, right: 10, bottom: 20 }
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
            datalabels: {
                anchor: 'end' as const,
                align: isMobile ? ('top' as const) : ('top' as const),
                color: '#52555F',
                font: { size: 12, family: 'Roboto' },
                formatter: (value: number) => `${value} грн`,

                labels: isMobile ? {
                    title: {
                        formatter: (_value: any, context: any) => context.chart.data.labels[context.dataIndex],
                        align: 'top' as const,
                        anchor: 'start' as const,
                        padding: { bottom: 10 },
                        font: { size: 12, family: 'Roboto' },
                        color: '#52555F',
                    },
                    value: {
                        formatter: (value: number) => `${value} грн`,
                        align: 'bottom' as const,
                        anchor: 'end' as const,
                        padding: { bottom: 10 },
                        font: { size: 12, family: 'Roboto' },
                        color: '#52555F',
                    }
                } : {}
            },
        },
        scales: {
            x: {
                display: !isMobile,
                grid: { display: false },
                border: { display: false },
                ticks: {
                    color: '#52555F',
                    font: { size: 12 }
                }
            },
            y: {
                display: false,
                grid: { display: false },
                border: { display: false }
            }
        }
    };

    const barSize = isMobile ? 50 : 80;
    const dynamicSize = chartDataData.length * barSize;

    return (
        <section className={styles.chart}>
            <div
                className={styles.container}
                style={{
                    height: isMobile ? `${dynamicSize}px` : '400px',
                    minWidth: !isMobile ? `${dynamicSize}px` : 'auto',
                    overflowX: !isMobile ? 'auto' : 'visible'
                }}
            >
                <Bar data={data} options={options} />
            </div>
        </section>
    );
}