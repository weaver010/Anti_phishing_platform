<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportsController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', \App\Http\Middleware\AdminAccessMiddleware::class]);
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Reports/Index');
    }

    public function contacts(Request $request): Response
    {
        $query = Contact::with('readBy');

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            $status = $request->get('status');
            if (in_array($status, ['unread', 'read', 'replied'])) {
                $query->where('status', $status);
            }
        }

        // Sort functionality
        $sortField = $request->get('sort', 'created_at');
        $sortDirection = $request->get('direction', 'desc');

        $allowedSorts = ['name', 'email', 'status', 'created_at'];
        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection);
        } else {
            $query->latest();
        }

        $contacts = $query->paginate(15)->withQueryString();

        // Get statistics
        $stats = [
            'total' => Contact::count(),
            'unread' => Contact::unread()->count(),
            'read' => Contact::read()->count(),
            'replied' => Contact::replied()->count(),
        ];

        return Inertia::render('Admin/Reports/Contacts', [
            'contacts' => $contacts,
            'stats' => $stats,
            'filters' => $request->only(['search', 'status', 'sort', 'direction']),
        ]);
    }

    public function showContact(Contact $contact): Response
    {
        // Mark as read if it's unread
        if ($contact->status === 'unread') {
            $contact->markAsRead(auth()->id());
        }

        return Inertia::render('Admin/Reports/ContactShow', [
            'contact' => $contact->load('readBy'),
        ]);
    }

    public function updateContact(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'status' => 'required|in:unread,read,replied',
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        $contact->update($validated);

        return redirect()->back()->with('success', 'Contact updated successfully.');
    }

    public function deleteContact(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('admin.reports.contacts')
            ->with('success', 'Contact deleted successfully.');
    }
}
