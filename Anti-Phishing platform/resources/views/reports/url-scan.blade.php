<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>URL Scan Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #3b82f6;
            margin-bottom: 5px;
        }
        .title {
            font-size: 22px;
            margin-bottom: 5px;
        }
        .subtitle {
            color: #666;
            font-size: 14px;
        }
        .url-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            word-break: break-all;
        }
        .url {
            font-weight: bold;
            color: #1e40af;
        }
        .status-box {
            margin: 25px 0;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
        }
        .safe {
            background-color: #dcfce7;
            border: 1px solid #86efac;
            color: #166534;
        }
        .suspicious {
            background-color: #fef9c3;
            border: 1px solid #fde047;
            color: #854d0e;
        }
        .dangerous {
            background-color: #fee2e2;
            border: 1px solid #fca5a5;
            color: #991b1b;
        }
        .status-text {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .stats-container {
            margin: 25px 0;
        }
        .stats-table {
            width: 100%;
            border-collapse: collapse;
        }
        .stats-table th, .stats-table td {
            border: 1px solid #e5e7eb;
            padding: 8px 12px;
            text-align: left;
        }
        .stats-table th {
            background-color: #f3f4f6;
        }
        .green {
            color: #16a34a;
        }
        .yellow {
            color: #ca8a04;
        }
        .red {
            color: #dc2626;
        }
        .gray {
            color: #6b7280;
        }
        .footer {
            margin-top: 40px;
            font-size: 12px;
            color: #6b7280;
            text-align: center;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">AntiPhishing Command</div>
        <div class="title">URL Scan Report</div>
        <div class="subtitle">Generated on {{ $scanDate }}</div>
    </div>
    
    <div class="url-box">
        <strong>Scanned URL:</strong><br>
        <span class="url">{{ $url }}</span>
    </div>
    
    <div class="status-box {{ $isSafe ? 'safe' : ($isSuspicious ? 'suspicious' : 'dangerous') }}">
        <div class="status-text">{{ $statusMessage }}</div>
        <div>
            @if($isSafe)
                This URL appears to be safe. No security vendors flagged it as malicious.
            @elseif($isSuspicious)
                This URL was flagged as suspicious by {{ $stats['suspicious'] }} security vendors.
            @else
                This URL was flagged as malicious by {{ $stats['malicious'] }} security vendors.
            @endif
        </div>
    </div>
    
    <div class="stats-container">
        <h3>Security Vendor Results</h3>
        <table class="stats-table">
            <tr>
                <th>Status</th>
                <th>Count</th>
                <th>Percentage</th>
            </tr>
            <tr>
                <td><span class="green">Safe</span></td>
                <td>{{ $stats['harmless'] ?? 0 }}</td>
                <td>
                    @php
                        $total = array_sum($stats);
                        $percent = $total > 0 ? round(($stats['harmless'] ?? 0) / $total * 100) : 0;
                    @endphp
                    {{ $percent }}%
                </td>
            </tr>
            <tr>
                <td><span class="yellow">Suspicious</span></td>
                <td>{{ $stats['suspicious'] ?? 0 }}</td>
                <td>
                    @php
                        $percent = $total > 0 ? round(($stats['suspicious'] ?? 0) / $total * 100) : 0;
                    @endphp
                    {{ $percent }}%
                </td>
            </tr>
            <tr>
                <td><span class="red">Malicious</span></td>
                <td>{{ $stats['malicious'] ?? 0 }}</td>
                <td>
                    @php
                        $percent = $total > 0 ? round(($stats['malicious'] ?? 0) / $total * 100) : 0;
                    @endphp
                    {{ $percent }}%
                </td>
            </tr>
            <tr>
                <td><span class="gray">Undetected</span></td>
                <td>{{ $stats['undetected'] ?? 0 }}</td>
                <td>
                    @php
                        $percent = $total > 0 ? round(($stats['undetected'] ?? 0) / $total * 100) : 0;
                    @endphp
                    {{ $percent }}%
                </td>
            </tr>
        </table>
    </div>
    
    @if(isset($results['scanned_at']))
    <div>
        <h3>Additional Information</h3>
        <p><strong>Scan Date:</strong> {{ $scanDate }}</p>
        <p><strong>Analysis Status:</strong> {{ $results['status'] ?? 'Unknown' }}</p>
    </div>
    @endif
    
    <div class="footer">
        <p>This scan was performed using the AntiPhishing Command security platform.</p>
        <p>Report generated on {{ $scanDate }}</p>
    </div>
</body>
</html> 