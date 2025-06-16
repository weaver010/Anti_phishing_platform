<?php

namespace Database\Seeders;

use App\Models\Contact;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contacts = [
            [
                'name' => 'John Doe',
                'email' => 'john.doe@example.com',
                'message' => 'I received a suspicious email claiming to be from my bank asking for my login credentials. Can you help me verify if this is a phishing attempt?',
                'status' => 'unread',
                'ip_address' => '192.168.1.100',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'created_at' => now()->subDays(2),
            ],
            [
                'name' => 'Sarah Johnson',
                'email' => 'sarah.j@company.com',
                'message' => 'Our company needs training on phishing awareness. Do you offer corporate training programs?',
                'status' => 'read',
                'ip_address' => '10.0.0.50',
                'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                'created_at' => now()->subDays(1),
                'read_at' => now()->subHours(12),
            ],
            [
                'name' => 'Mike Wilson',
                'email' => 'mike.wilson@email.com',
                'message' => 'Thank you for the excellent phishing detection service. It helped me identify and avoid a malicious website.',
                'status' => 'replied',
                'ip_address' => '203.0.113.45',
                'user_agent' => 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
                'created_at' => now()->subHours(6),
                'read_at' => now()->subHours(4),
                'admin_notes' => 'Positive feedback - consider for testimonial',
            ],
            [
                'name' => 'Emily Chen',
                'email' => 'emily.chen@university.edu',
                'message' => 'I am a cybersecurity student researching phishing techniques. Could you provide some educational resources?',
                'status' => 'unread',
                'ip_address' => '172.16.0.25',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101',
                'created_at' => now()->subHours(3),
            ],
            [
                'name' => 'David Brown',
                'email' => 'david.brown@startup.io',
                'message' => 'We are a startup looking to integrate phishing protection into our platform. Do you offer API access?',
                'status' => 'read',
                'ip_address' => '198.51.100.75',
                'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
                'created_at' => now()->subHours(1),
                'read_at' => now()->subMinutes(30),
            ],
        ];

        foreach ($contacts as $contactData) {
            Contact::create($contactData);
        }
    }
}
