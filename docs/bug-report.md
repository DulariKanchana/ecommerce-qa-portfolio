# Bug Report — AutomationExercise.com

## BUG-001 | AUT-19 — KeyError at /logout

**Summary:** Django server error exposed when logging out with an invalidated session

**Severity:** High
**Priority:** High
**Type:** Functional + Security
**Status:** Open
**Found During:** Exploratory Testing

**Environment:**
Browser: Safari | OS: macOS | URL: automationexercise.com/logout

**Steps to Reproduce:**
1. Navigate to automationexercise.com
2. Log in with valid credentials
3. Clear browser cookies manually (DevTools → Application → Clear cookies)
4. Click Logout in the navbar

**Expected Result:**
User is logged out and redirected to home or login page gracefully.

**Actual Result:**
Django server error page displayed showing `KeyError: 'user_id'`.
Full internal stack trace exposed including Python version, file paths
and Django version.

**Root Cause (observed):**
`views.py` line 216 executes `del request.session['user_id']` without
first checking if the key exists in the session. When cookies are cleared,
the session no longer contains `user_id`, causing the KeyError.

---

## BUG-002 | AUT-22 — Invalid card number accepted

**Summary:** Payment processed without card number validation

**Severity:** Medium
**Priority:** Medium
**Type:** Functional
**Status:** Open
**Found During:** Manual Test Execution (AUT-16)

**Environment:**
Browser: Chrome | OS: macOS | URL: automationexercise.com/payment

**Steps to Reproduce:**
1. Log in and add a product to cart
2. Proceed to checkout
3. Enter invalid card details:
   - Card: 0000000000000000
   - CVC: 000
   - Expiry: 01/01
4. Click Pay and Confirm Order

**Expected Result:**
Error message shown. Order is not placed.

**Actual Result:**
Order placed successfully despite invalid card number.
No validation on payment details.

**Note:**
AutomationExercise uses a simulated payment gateway. This behaviour
would not be acceptable on a real ecommerce platform.