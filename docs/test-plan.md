# AutomationExercise — Test Plan

---

## 1. Objective

Validate AutomationExercise.com with end-to-end testing covering user registration, login, product browsing, cart and checkout flow.

---

## 2. Scope

### 2.1 In Scope
- User registration and login
- Product browsing and search
- Cart and checkout flow
- Contact Us form

### 2.2 Out of Scope
- Security testing
- Performance testing
- API testing
- Mobile responsiveness

---

## 3. Test Types
- Manual functional testing
- Automated E2E testing

---

## 4. Test Environment

| | |
|---|---|
| **URL** | https://automationexercise.com |
| **Browser** | Chrome, Safari |
| **OS** | macOS |
| **Automation Tool** | Playwright (JavaScript) |

---

## 5. Entry Criteria
- Test plan reviewed and approved
- Jira and Xray configured
- All test cases written in Xray with steps, test data and expected results
- Test environment is accessible
- Playwright installed and sample code runs successfully
- Test data prepared

---

## 6. Exit Criteria
- All test cases executed at least once
- All High priority test cases passed
- All High severity defects logged in Jira with steps to reproduce
- Test execution report generated in Xray

---

## 7. Tools

| Tool | Purpose |
|---|---|
| Jira + Xray | Test management |
| Jira | Bug tracking |
| Playwright | Automation |

---

## 8. Risks

| Risk | Impact |
|---|---|
| Site has ads and popups that can interfere with automation | Medium |
| No real full payment flow — checkout is simulated | Medium |
| Locators may break if the site updates its HTML structure | High |
