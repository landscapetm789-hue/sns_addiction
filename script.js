// Common Chart.js options for dark theme
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Pretendard', sans-serif";

const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: '#f8fafc',
                font: {
                    family: "'Pretendard', sans-serif",
                    size: 13
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: '#f8fafc',
            bodyColor: '#e2e8f0',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            boxPadding: 4
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(255, 255, 255, 0.05)',
                drawBorder: false
            },
            ticks: {
                color: '#94a3b8'
            }
        },
        y: {
            grid: {
                color: 'rgba(255, 255, 255, 0.05)',
                drawBorder: false
            },
            ticks: {
                color: '#94a3b8'
            }
        }
    },
    animation: {
        duration: 2000,
        easing: 'easeOutQuart'
    }
};

// 1. 연도별 논문 수 (Yearly Papers) - Line Chart
const renderYearlyChart = () => {
    const ctx = document.getElementById('yearlyChart').getContext('2d');
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)'); // blue-500
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dashboardData.yearly_papers.labels,
            datasets: [{
                label: '발행 논문 수',
                data: dashboardData.yearly_papers.values,
                borderColor: '#3b82f6',
                backgroundColor: gradient,
                borderWidth: 3,
                pointBackgroundColor: '#1e293b',
                pointBorderColor: '#3b82f6',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.4 // smooth curve
            }]
        },
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                legend: { display: false }
            }
        }
    });
};

// 2. 키워드 빈도 (Top Keywords) - Bar Chart
const renderKeywordChart = () => {
    const ctx = document.getElementById('keywordChart').getContext('2d');

    const gradientBar = ctx.createLinearGradient(0, 0, 0, 400);
    gradientBar.addColorStop(0, '#8b5cf6'); // violet-500
    gradientBar.addColorStop(1, '#a78bfa'); // violet-400

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dashboardData.top_keywords.labels,
            datasets: [{
                label: '출현 빈도',
                data: dashboardData.top_keywords.values,
                backgroundColor: gradientBar,
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            ...commonOptions,
            indexAxis: 'y', // Horizontal bar chart
            plugins: {
                ...commonOptions.plugins,
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8' }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#f8fafc', font: { size: 12 } }
                }
            }
        }
    });
};

// 3. 학술지 분포 (Top Journals) - Doughnut Chart
const renderJournalChart = () => {
    const ctx = document.getElementById('journalChart').getContext('2d');

    // Muted bright colors for dark theme
    const colors = [
        '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#facc15',
        '#10b981', '#0ea5e9', '#6366f1', '#d946ef', '#14b8a6'
    ];

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: dashboardData.top_journals.labels,
            datasets: [{
                data: dashboardData.top_journals.values,
                backgroundColor: colors,
                borderColor: '#1e293b',
                borderWidth: 2,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#f8fafc',
                        padding: 15,
                        font: { size: 11, family: "'Pretendard', sans-serif" },
                        boxWidth: 12
                    }
                },
                tooltip: commonOptions.plugins.tooltip
            },
            cutout: '70%',
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Small delay for smooth entry
    setTimeout(() => {
        renderYearlyChart();
        renderKeywordChart();
        renderJournalChart();
    }, 100);
});
